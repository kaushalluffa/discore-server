import { prisma } from "../prisma";
export const createConversation = async (members: any) => {
  try {
    const conversation = prisma.conversation.create({
      data: {
        type: "DIRECT_MESSAGE",
        members: {
          create: members,
        },
      },
      include: { members: true },
    });
    return conversation;
  } catch (error) {
    console.log(error);
  }
};
export const getConversations = async (id: any) => {
  try {
    const conversations = await prisma.conversation.findMany({
      where: { members: { some: { userId: id } } },
      include: { members: true },
    });
    return conversations;
  } catch (error) {
    console.log(error);
  }
};
