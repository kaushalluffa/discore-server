import dotenv from "dotenv";
import express from "express";
import { createServer } from "node:http";
import cookieParser from "cookie-parser";

import { PORT, COMPLETE_URL } from "./constants";
import bodyParser from "body-parser";
import authRouter from "./controllers/authController";
dotenv.config();

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
const server = createServer(app);

app.use(authRouter);


server.listen(PORT, () => {
  console.log(`server running at ${COMPLETE_URL}`);
});
