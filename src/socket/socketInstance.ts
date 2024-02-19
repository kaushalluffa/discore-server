import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

let io: Server<
  DefaultEventsMap,
  DefaultEventsMap,
  DefaultEventsMap,
  any
> | null = null;
export const setSocketInstance = (ioInstance: typeof io) => {
  io = ioInstance;
};
export const getSocketInstance = () => {
  return io;
};
