import { prisma } from "../prisma";
import { TypedCreateServerReq } from "../types";
import { v4 as uuid } from "uuid";
export const createServer = async (payload: TypedCreateServerReq["body"]) => {
  const server = await prisma.server.create({
    data: {
      profileId: payload?.profileId,
      imageUrl: payload?.imageUrl,
      inviteCode: uuid(),
      name: payload?.name,
      channels: {
        create: [{ name: "general", profileId: payload?.profileId }],
      },
      members: { create: [{ profileId: "", role: "ADMIN" }] },
    },
  });
  return server;
};
