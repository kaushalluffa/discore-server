import { Server } from "socket.io";
import { setSocketInstance } from "./socketInstance";

export const initializeIO = (server: any) => {
  const io = new Server(server, {
    cors: {
      origin: ["https://admin.socket.io"],
      credentials: true,
    },
  });
  setSocketInstance(io);
};
