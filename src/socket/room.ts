export const joinRoom = (socket: any, roomName: any) => {
  socket.join(roomName);
};

export const leaveRoom = (socket: any, roomName: any) => {
  socket.leave(roomName);
};

