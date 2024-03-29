import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { PORT, COMPLETE_URL, CLIENT_URL } from "./constants";
import bodyParser from "body-parser";
import conversationRouter from "./controllers/conversationControllers";
import messageRouter from "./controllers/messageController";
import ioMiddleware from "./middleware/ioMiddleware";
import { app, io, server } from "./socket/socket";
import { handleEvents } from "./socket/events";
import usersController from "./controllers/usersControllers";
import authController from "./controllers/authController";
import authMiddleware from "./middleware/authMiddleware";
import imageKitAuthController from "./controllers/imageKitAuthController";

dotenv.config();

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());

// io middleware auth
io.use(ioMiddleware).on("connection", (socket) => {
  handleEvents(socket);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
app.use("/auth", authController);
//protected routes
app.use("/users", authMiddleware, usersController);
app.use("/conversation", authMiddleware, conversationRouter);
app.use("/message", authMiddleware, messageRouter);
app.use("/img-kit", imageKitAuthController);
server.listen(PORT, () => {
  console.log(`server running at ${COMPLETE_URL}`);
});
