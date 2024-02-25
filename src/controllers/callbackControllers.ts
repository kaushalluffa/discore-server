import express from "express";
import { workos, workosClientId } from "../utils/workos";
import { prisma } from "../prisma";
import generateToken from "../utils/generateToken";
import { CLIENT_URL } from "../constants";

const callbacksRouter = express.Router();

callbacksRouter.get("/auth", async (req: any, res: any) => {
  const code = req.query.code;
  let user;
  const { user: workosUser } = await workos.userManagement.authenticateWithCode(
    {
      code,
      clientId: workosClientId,
    }
  );
  try {
    user = await prisma.user.findFirst({
      where: { workOSId: workosUser?.id },
    });
    if (!user) {
      user = await prisma.user.create({
        data: {
          workOSId: workosUser?.id,
          name: `${workosUser?.firstName ?? ""} ${workosUser?.lastName}`,
          email: workosUser?.email,
          imageUrl: workosUser?.profilePictureUrl,
        },
      });
    }
    const token = await generateToken(user);
    res.cookie("token", token, {
      path: "/",
      sameSite: "lax",
    });
    res.redirect(CLIENT_URL);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
});

export default callbacksRouter;
