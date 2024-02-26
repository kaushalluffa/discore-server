import { prisma } from "../prisma";
export const createConversation = async (members: any) => {
  try {
    const conversation = await prisma.conversation.create({
      data: {
        type: "DIRECT_MESSAGE",
        members: {
          create: members?.map((user: any) => ({ userId: user?.id })),
        },
      },
      include: { members: true },
    });

    return conversation;
  } catch (error) {
    console.log(error);
  }
};
export const getConversations = async (userId: any) => {
  try {
    const conversations = await prisma.conversation.findMany({
      where: { members: { some: { userId } } },
      include: { members: { include: { user: true } } },
    });
    return conversations;
  } catch (error) {
    console.log(error);
  }
};
export const getOneConversation = async (conversationId: any) => {
  try {
    const oneConversation = await prisma.conversation.findFirst({
      where: { id: conversationId },
      include: { members: { include: { user: true } } },
    });
    return oneConversation;
  } catch (error) {
    console.log(error);
  }
};
