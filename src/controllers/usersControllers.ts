import express from "express";
import { getAllUsers, getLoggedInUser } from "../models/usersModel";
const usersController = express.Router();

usersController.post("/all", async (req: any, res: any) => {
  const allUsers = await getAllUsers(req);
  res.json(allUsers);
});

usersController.get("/isLoggedIn", async (req: any, res: any) => {
  const isLoggedIn = await getLoggedInUser(req);
  res.status(200).json(isLoggedIn);
});
export default usersController;
