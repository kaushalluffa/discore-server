import { joinRoom, leaveRoom } from "./room";

export const handleEvents = (socket: any) => {
  socket.on("joinRoom", (roomName: any) => {
    joinRoom(socket, roomName);
  });

  socket.on("leaveRoom", (roomName: any) => {
    leaveRoom(socket, roomName);
  });
  socket.on("joinConversation", (conversationId: any) => {
    console.log("join conversation");
    joinRoom(socket, conversationId);
  });
  // Add more event handlers as needed
};
