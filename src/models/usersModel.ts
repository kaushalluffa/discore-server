import { jwtVerify } from "jose";
import { prisma } from "../prisma";
import { secret } from "../constants";

export const getAllUsers = async () => {
  const allUsers = await prisma.user.findMany({ orderBy: { name: "asc" } });
  return allUsers;
};
export const getLoggedInUser = async (req: any) => {
  const token = req.cookies.token;
  try {
    const { payload: user } = await jwtVerify(token, secret);
    return { isAuthenticated: true, user: user?.payload };
  } catch (error) {
    return { isAuthenticated: false };
  }
};
