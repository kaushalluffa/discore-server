import express, { Response } from "express";
import dotenv from "dotenv";
import {
  createConversation,
  getConversations,
  getOneConversation,
} from "../models/conversationModel";

dotenv.config();

const conversationRouter = express.Router();

conversationRouter.get("/", async (req: any, res: Response) => {
  const userConversations = await getConversations(req?.user?.id);
  res.json(userConversations);
});
conversationRouter.post("/", async (req: any, res: Response) => {
  const oneConversation = await getOneConversation(req?.body?.conversationId);
  res.json(oneConversation);
});
conversationRouter.post("/create", async (req: any, res: Response) => {
  const createdConversation = await createConversation(req?.body?.members);
  res.json(createdConversation);
});
export default conversationRouter;
