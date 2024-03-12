import { jwtVerify } from "jose";
import { prisma } from "../prisma";
import { secret } from "../constants";

export const getAllUsers = async (req: any) => {
  const search = req?.body?.search;
  const allUsers = await prisma.user.findMany({
    where: {
      id: { not: { equals: req?.user?.id } },
      OR: search
        ? [
            { email: { contains: req?.body?.search } },
            { name: { contains: req?.body?.search } },
          ]
        : undefined,
    },
    orderBy: { name: "asc" },
  });
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
