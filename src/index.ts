import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { PORT, COMPLETE_URL } from "./constants.js";
import bodyParser from "body-parser";
import conversationRouter from "./controllers/conversationControllers.js";
import messageRouter from "./controllers/messageController.js";
import ioMiddleware from "./middleware/ioMiddleware.js";
import { app, io, server } from "./socket/socket.js";
import { handleEvents } from "./socket/events.js";
import usersController from "./controllers/usersControllers.js";
import authController from "./controllers/authController.js";
import authMiddleware from "./middleware/authMiddleware.js";
import imageKitAuthController from "./controllers/imageKitAuthController.js";

dotenv.config();

app.use(cors());
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
