import { joinRoom, leaveRoom } from "./room";

export const handleEvents = (socket: any) => {
  socket.on("joinRoom", (roomName: any) => {
    joinRoom(socket, roomName);
  });

  socket.on("leaveRoom", (roomName: any) => {
    leaveRoom(socket, roomName);
  });

  // Add more event handlers as needed
};
