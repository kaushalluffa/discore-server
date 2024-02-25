import express from "express";
import dotenv from "dotenv";
import { workos, workosClientId } from "../utils/workos";
dotenv.config();
const workOSRouter = express.Router();

workOSRouter.get("/auth", (_req: any, res: any) => {
  const authorizationUrl = workos.userManagement.getAuthorizationUrl({
    provider: "authkit",
    redirectUri: "http://localhost:8000/callback/auth",
    clientId: workosClientId,
  });
  res.redirect(authorizationUrl);
});

export default workOSRouter;
