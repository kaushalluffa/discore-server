import { SignJWT } from "jose";
import { secret } from "../constants";

export default async function generateToken(payload: any) {
  const token = await new SignJWT({
    payload,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
  return token;
}
