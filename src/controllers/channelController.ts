import express, { Response } from "express";
import dotenv from "dotenv";
import { TypedCreateChannelReq, TypedGetChannelReq } from "../types";

import { authMiddleware } from "../middleware/authMiddleware";
import { getChannel, createChannel } from "../models/channelModel";
dotenv.config();

const channelRouter = express.Router();

channelRouter.post(
  "/channel",
  authMiddleware,
  async (req: TypedGetChannelReq, res: Response) => {
    const allServers = await getChannel(req);
    res.json(allServers);
  }
);
channelRouter.post(
  "/channel/create",
  authMiddleware,
  async (req: TypedCreateChannelReq, res: Response) => {
    const createdServer = await createChannel(req);
    res.json(createdServer);
  }
);
export default channelRouter;
