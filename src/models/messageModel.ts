import { prisma } from "../prisma";
import { io } from "../socket/socket";
import deleteImageKitFile from "../utils/deleteImageKitFile";

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
        ...req?.body?.messageBody,
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
export const deleteMessage = async (req: any) => {
  try {
    const message = await prisma.message.findFirst({
      where: { id: req?.body?.message?.id },
      include: {
        conversation: {
          include: { members: { include: { user: { select: { id: true } } } } },
        },
      },
    });
    const member = await prisma.member.findFirst({
      where: { id: message?.senderId },
    });
    if (member?.userId === req?.user?.id) {
      await prisma.message.delete({ where: { id: req?.body?.message?.id } });
      if (message?.fileId) {
        await deleteImageKitFile(message?.fileId);
      }
      io.to(req?.body?.message?.conversationId).emit(
        "deletedMessage",
        message?.id
      );
      return message;
    } else {
      return { message: "You are not allowed to delete this message" };
    }
  } catch (error: any) {
    console.log(error, "error");
    return {
      success: false,
      message: error?.message ?? "Something went wrong please try again",
    };
  }
};
