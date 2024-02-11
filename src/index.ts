import dotenv from "dotenv";
import express from "express";
import { createServer } from "node:http";
import cookieParser from "cookie-parser";
import cors from "cors";
import { PORT, COMPLETE_URL, CLIENT_URL } from "./constants";
import bodyParser from "body-parser";
import authRouter from "./controllers/authController";
import serverRouter from "./controllers/serverController";
dotenv.config();
const app = express();
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
const server = createServer(app);

app.use(authRouter);
app.use(serverRouter);
server.listen(PORT, () => {
  console.log(`server running at ${COMPLETE_URL}`);
});
