import express, { Response } from "express";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { CLIENT_EXPIRED_TOKEN_URL, JWT_SECRET_KEY } from "../constants";
const app = express();
app.use(cookieParser());

export const authMiddleware = (req: any, res: Response, next: () => void) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded: any = jwt.verify(token, JWT_SECRET_KEY); // Replace with your actual secret
    const now = Date.now() / 1000;
    if (now > decoded?.exp) {
      return res
        .status(401)
        .json({ message: "EXPIRED_TOKEN", redirect: CLIENT_EXPIRED_TOKEN_URL });
    }
    req.user = decoded; // Attach user profile data to the request object
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
