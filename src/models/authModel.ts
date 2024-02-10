import { prisma } from "../prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../constants";
export const signupHandler = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    let newUser;
    newUser = await prisma.profile.findFirst({ where: { email } });
    if (newUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser = await prisma.profile.create({
      data: {
        email,
        imageUrl: "",
        name,
        password: hashedPassword,
      },
      select: {
        email: true,
        imageUrl: true,
        name: true,
      },
    });
    const token = jwt.sign(newUser, JWT_SECRET_KEY, { expiresIn: "7d" });
    return { token, success: true };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message ?? "Something went wrong please try again",
    };
  }
};
export const loginHandler = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    let user;
    user = await prisma.profile.findFirst({ where: { email } });
    if (!user) {
      return {
        success: false,
        error: "Email or password incorrect",
      };
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        success: false,
        error: "Email or password incorrect",
      };
    }
    const token = jwt.sign(
      { email: user.email, name: user.name },
      JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );
    return { success: true, token };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message ?? "Something went wrong please try again",
    };
  }
};
