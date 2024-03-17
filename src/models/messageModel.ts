import { prisma } from "../prisma";
import { io } from "../socket/socket";

export const getMessages = async (req: any) => {
  try {
    const messages = await prisma.message.findMany({
      where: { conversationId: req?.body?.conversationId },
      include: {
        sender: {
          include: {
            user: {
              select: { id: true, imageUrl: true, email: true, name: true },
            },
          },
        },
      },
    });
    return messages;
  } catch (error) {
    console.log(error);
  }
};
export const createMessage = async (req: any) => {
  try {
    const message = await prisma.message.create({
      data: {
        body: req?.body?.messageBody,
        sender: { connect: { id: req?.body?.senderId } },
        conversation: { connect: { id: req?.body?.conversationId } },
      },
      include: {
        sender: {
          include: {
            user: { select: { id: true, imageUrl: true, email: true } },
          },
        },
      },
    });
    io.to(req?.body?.conversationId).emit("newMessage", message);
    return message;
  } catch (error: any) {
    console.log(error, "error");
    return {
      success: false,
      message: error?.message ?? "Something went wrong please try again",
    };
  }
};
