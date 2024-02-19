import express, { Response } from "express";
import dotenv from "dotenv";
import { TypedGetChannelReq } from "../types";

import { authMiddleware } from "../middleware/authMiddleware";
import { createMessage } from "../models/messageModel";
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
  async (req: any, res: Response) => {
    const createdMessage = await createMessage();
    res.json(createdMessage);
  }
);
export default messageRouter;
