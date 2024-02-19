import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../constants";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { ExtendedError } from "socket.io/dist/namespace";
export default function ioMiddleware(
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  next: (err?: ExtendedError | undefined) => void
) {
  const token = socket.handshake.headers.authorization ?? "";
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET_KEY); // Replace with your actual secret
    const now = Date.now() / 1000;
    if (now > decoded?.exp) {
      const err = new Error("Token expired");
      next(err);
    }
    next();
  } catch (error) {
    next(new Error("Invalid token"));
  }
}
