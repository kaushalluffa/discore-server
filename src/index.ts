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
import workOSRouter from "./controllers/workOSAuth";
import callbacksRouter from "./controllers/callbackControllers";

dotenv.config();

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());

//workos auth
app.use(workOSRouter);

//callbacks
app.use("/callback", callbacksRouter);
// io middleware auth
io.use(ioMiddleware).on("connection", (socket) => {
  console.log("a user connected");
  handleEvents(socket);
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
