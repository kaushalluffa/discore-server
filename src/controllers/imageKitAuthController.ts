import express from "express";
import { imagekit } from "../constants";
import deleteImageKitFile from "../utils/deleteImageKitFile";

const imageKitAuthController = express.Router();

imageKitAuthController.get("/auth", function (_req, res) {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});
imageKitAuthController.delete("/delete", async function (req: any, res: any) {
  await deleteImageKitFile(req?.body?.fileId);
  res.json({ message: "file deleted" });
});
export default imageKitAuthController;
