import { CLIENT_AUTH_URL, JWT_SECRET_KEY } from "../constants";
import jwt from "jsonwebtoken";
export default async function authMiddleware(req: any, res: any, next: any) {
  const token = req?.cookies?.token ?? null;
  let verifiedToken;
  try {
    verifiedToken = await jwt.verify(token, JWT_SECRET_KEY);

    if (!verifiedToken) {
      const err = new Error("Token expired");
      next(err);
      res.redirect(CLIENT_AUTH_URL);
    }
    next();
  } catch (error) {
    next(new Error("Invalid token"));
    res.redirect(CLIENT_AUTH_URL);
  }
}
