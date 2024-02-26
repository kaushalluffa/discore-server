import { secret } from "../constants";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { ExtendedError } from "socket.io/dist/namespace";
import { jwtVerify } from "jose";
export default async function ioMiddleware(
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  next: (err?: ExtendedError | undefined) => void
) {
  const token = socket.handshake.auth.token ?? "";
  let verifiedToken;
  try {
    verifiedToken = await jwtVerify(token, secret);

    if (!verifiedToken) {
      const err = new Error("Token expired");
      next(err);
    }
    next();
  } catch (error) {
    next(new Error("Invalid token"));
  }
}
