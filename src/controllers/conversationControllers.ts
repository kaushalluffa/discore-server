import express, { Response } from "express";
import dotenv from "dotenv";
import { authMiddleware } from "../middleware/authMiddleware";
import {
  createConversation,
  getConversations,
} from "../models/conversationModel";

dotenv.config();

const conversationRouter = express.Router();

conversationRouter.get(
  "/conversation",
  authMiddleware,
  async (req: any, res: Response) => {
    const userConversations = await getConversations(req?.user?.id);
    res.json(userConversations);
  }
);
conversationRouter.post(
  "/conversation/create",
  authMiddleware,
  async (req: any, res: Response) => {
    const createdConversation = await createConversation(req?.body?.members);
    res.json(createdConversation);
  }
);
export default conversationRouter;
