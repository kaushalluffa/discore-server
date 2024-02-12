import { prisma } from "../prisma";
import { TypedCreateChannelReq, TypedGetChannelReq } from "../types";

export const getChannel = async (req: TypedGetChannelReq) => {
  if (req?.profile) {
    try {
      const channels = await prisma.channel.findMany({
        where: {
          AND: [
            {
              serverId: req?.body?.serverId,
              server: { members: { some: { profileId: req?.profile?.id } } },
            },
          ],
        },
      });
      return channels;
    } catch (error: any) {
      console.log(error, "error");
      return {
        success: false,
        message: error?.message ?? "Something went wrong please try again",
      };
    }
  }
};
export const createChannel = async (req: TypedCreateChannelReq) => {
  if (req?.profile) {
    try {
      const channel = await prisma.channel.create({
        data: {
          profileId: req?.profile?.id,
          name: req?.body?.name,
          type: req?.body?.type,
          serverId: req?.body?.serverId,
        },
      });
      return channel;
    } catch (error: any) {
      console.log(error, "error");
      return {
        success: false,
        message: error?.message ?? "Something went wrong please try again",
      };
    }
  }
};
