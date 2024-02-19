import dotenv from "dotenv";
import express from "express";
import { createServer } from "node:http";
import cookieParser from "cookie-parser";
import cors from "cors";
import { PORT, COMPLETE_URL, CLIENT_URL } from "./constants";
import bodyParser from "body-parser";
import authRouter from "./controllers/authController";
import conversationRouter from "./controllers/conversationControllers";
import messageRouter from "./controllers/messageController";
import { authMiddleware } from "./middleware/authMiddleware";
import { instrument } from "@socket.io/admin-ui";
import ioMiddleware from "./middleware/ioMiddleware";
import { getSocketInstance } from "./socket/socketInstance";
import { initializeIO } from "./socket/socket";
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

initializeIO(server);
const io = getSocketInstance();
// socket admin ui only for development
instrument(io!, {
  auth: false,
  mode: "development",
});

// auth routes
app.use(authRouter);

// auth middleware
app.use(authMiddleware);

// io middleware auth
io!.use(ioMiddleware).on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

//protected routes
app.use(conversationRouter);
app.use(messageRouter);

server.listen(PORT, () => {
  console.log(`server running at ${COMPLETE_URL}`);
});
