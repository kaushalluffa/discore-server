import express, { Response } from "express";
import dotenv from "dotenv";
import {
  createConversation,
  getConversations,
  getOneConversation,
} from "../models/conversationModel";
import workosAuthMiddleware from "../middleware/workosAuthMiddleware";

dotenv.config();

const conversationRouter = express.Router();

conversationRouter.get(
  "/",
  workosAuthMiddleware,
  async (req: any, res: Response) => {
    const userConversations = await getConversations(req?.user?.id);
    res.json(userConversations);
  }
);
conversationRouter.post(
  "/",
  workosAuthMiddleware,
  async (req: any, res: Response) => {
    const oneConversation = await getOneConversation(req?.body?.conversationId);
    res.json(oneConversation);
  }
);
conversationRouter.post(
  "/create",
  workosAuthMiddleware,
  async (req: any, res: Response) => {
    const createdConversation = await createConversation(req?.body?.members);
    res.json(createdConversation);
  }
);
export default conversationRouter;
