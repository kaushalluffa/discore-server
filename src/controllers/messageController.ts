import express, { Response } from "express";
import dotenv from "dotenv";
import { TypedCreateChannelReq, TypedGetChannelReq } from "../types";

import { authMiddleware } from "../middleware/authMiddleware";
dotenv.config();

const messageRouter = express.Router();

messageRouter.post(
  "/messages",
  authMiddleware,
  async (req: TypedGetChannelReq, res: Response) => {}
);
messageRouter.post(
  "/messages/create",
  authMiddleware,
  async (req: TypedCreateChannelReq, res: Response) => {}
);
export default messageRouter;
