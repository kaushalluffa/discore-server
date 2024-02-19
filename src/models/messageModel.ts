import { prisma } from "../prisma";
import { TypedGetChannelReq } from "../types";

export const getChannel = async (req: TypedGetChannelReq) => {
  if (req?.profile) {
    try {
    } catch (error: any) {
      console.log(error, "error");
      return {
        success: false,
        message: error?.message ?? "Something went wrong please try again",
      };
    }
  }
};
export const createMessage = async () => {
  try {
    const message = await prisma.message.create({
      data: {
        body: "hi test",
        conversationId: "a648f7e8-c3eb-4505-8cbd-91d64f5a60e3",
        senderId: "5d13dd3a-86d7-4b12-b9df-2342f67558d3",
      },
    });
    return message;
  } catch (error: any) {
    console.log(error, "error");
    return {
      success: false,
      message: error?.message ?? "Something went wrong please try again",
    };
  }
};
