import express, { Response } from "express";
import dotenv from "dotenv";
import { TypedCreateServerReq } from "../types";
import { createServer } from "../models/serverModel";
dotenv.config();

const serverRouter = express.Router();

serverRouter.post(
  "/server/create",
  async (req: TypedCreateServerReq, res: Response) => {
    const createdServer = await createServer(req?.body);
    res.json(createdServer);
  }
);
