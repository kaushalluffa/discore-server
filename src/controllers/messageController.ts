import express, { Response } from "express";
import dotenv from "dotenv";
import { TypedGetChannelReq } from "../types";
import { createMessage, getMessages } from "../models/messageModel";
dotenv.config();

const messageRouter = express.Router();

messageRouter.post(
  "/",

  async (req: TypedGetChannelReq, res: Response) => {
    console.log(req, "req");
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
export default messageRouter;
