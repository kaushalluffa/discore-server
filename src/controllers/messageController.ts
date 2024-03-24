import express, { Response } from "express";
import dotenv from "dotenv";
import { TypedGetChannelReq } from "../types";
import { createMessage, deleteMessage, getMessages } from "../models/messageModel";
dotenv.config();

const messageRouter = express.Router();

messageRouter.post(
  "/",

  async (req: TypedGetChannelReq, res: Response) => {
    const messages = await getMessages(req);
    res.json(messages);
  }
);
messageRouter.post(
  "/create",

  async (req: any, res: Response) => {
    const createdMessage = await createMessage(req);
    res.json(createdMessage);
  }
);
messageRouter.delete(
  "/delete",

  async (req: any, res: Response) => {
    const deletedMessage = await deleteMessage(req);
    res.json(deletedMessage);
  }
);
export default messageRouter;
