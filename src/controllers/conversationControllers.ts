import express, { Response } from "express";
import dotenv from "dotenv";
import {
  createConversation,
  deleteConversation,
  getConversations,
} from "../models/conversationModel";

dotenv.config();

const conversationRouter = express.Router();

conversationRouter.post("/", async (req: any, res: Response) => {
  const userConversations = await getConversations(req);
  res.json(userConversations);
});
conversationRouter.post("/create", async (req: any, res: Response) => {
  const createdConversation = await createConversation(req);
  res.json(createdConversation);
});
conversationRouter.delete("/delete", async (req: any, res: Response) => {
  const deletedConversation = await deleteConversation(req);
  res.json(deletedConversation);
});
export default conversationRouter;
