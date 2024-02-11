import { prisma } from "../prisma";
import { TypedCreateServerReq } from "../types";
import { v4 as uuid } from "uuid";
export const getServer = async (req: TypedCreateServerReq) => {
  if (req?.profile) {
    try {
      const servers = await prisma.server.findMany({
        where: {
          members: { some: { profileId: { equals: req?.profile?.id } } },
        },
        include: { members: true },
      });
      return servers;
    } catch (error: any) {
      console.log(error, "error");
      return {
        success: false,
        message: error?.message ?? "Something went wrong please try again",
      };
    }
  }
};
export const createServer = async (req: TypedCreateServerReq) => {
  if (req?.profile) {
    try {
      const server = await prisma.server.create({
        data: {
          profileId: req?.profile?.id,
          imageUrl: req?.profile?.imageUrl ?? "",
          inviteCode: uuid(),
          name: req?.profile?.name,
          channels: {
            create: [{ name: "general", profileId: req?.profile?.id }],
          },
          members: { create: [{ profileId: req?.profile?.id, role: "ADMIN" }] },
        },
      });
      return server;
    } catch (error: any) {
      console.log(error, "error");
      return {
        success: false,
        message: error?.message ?? "Something went wrong please try again",
      };
    }
  }
};
