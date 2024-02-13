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
export const createMessage = async (req: any) => {
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
