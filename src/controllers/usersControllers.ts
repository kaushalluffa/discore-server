import express from "express";
import { getAllUsers, getLoggedInUser } from "../models/usersModel";
import workosAuthMiddleware from "../middleware/workosAuthMiddleware";
const usersController = express.Router();

usersController.get(
  "/all",
  workosAuthMiddleware,
  async (_req: any, res: any) => {
    const allUsers = await getAllUsers();
    res.json(allUsers);
  }
);
usersController.get(
  "/isLoggedIn",
  workosAuthMiddleware,
  async (req: any, res: any) => {
    console.log("here");
    const isLoggedIn = await getLoggedInUser(req);
    res.status(200).json(isLoggedIn);
  }
);
export default usersController;
