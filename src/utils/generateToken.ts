import { SignJWT } from "jose";
import { JWT_SECRET_KEY } from "../constants";
// Get secret
const secret = new Uint8Array(Buffer.from(JWT_SECRET_KEY, "base64"));
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
