import express, { Response } from "express";
import dotenv from "dotenv";
import { TypedGetChannelReq } from "../types";
import { createMessage, getMessages } from "../models/messageModel";
import workosAuthMiddleware from "../middleware/workosAuthMiddleware";
dotenv.config();

const messageRouter = express.Router();

messageRouter.post(
  "/",
  workosAuthMiddleware,
  async (req: TypedGetChannelReq, res: Response) => {
    const messages = await getMessages(req);
    res.json(messages);
  }
);
messageRouter.post(
  "/create",
  workosAuthMiddleware,
  async (req: any, res: Response) => {
    const createdMessage = await createMessage(req);
    res.json(createdMessage);
  }
);
export default messageRouter;
