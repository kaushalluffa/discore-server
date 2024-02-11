import express, { Response } from "express";
import dotenv from "dotenv";
import { TypedCreateServerReq } from "../types";
import { createServer, getServer } from "../models/serverModel";
import { authMiddleware } from "../middleware/authMiddleware";
dotenv.config();

const serverRouter = express.Router();

serverRouter.get(
  "/server",
  authMiddleware,
  async (req: TypedCreateServerReq, res: Response) => {
    const allServers = await getServer(req);
    res.json(allServers);
  }
);
serverRouter.post(
  "/server/create",
  authMiddleware,
  async (req: TypedCreateServerReq, res: Response) => {
    const createdServer = await createServer(req);
    res.json(createdServer);
  }
);
export default serverRouter;
