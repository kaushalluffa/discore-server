import { jwtVerify } from "jose";
import { secret } from "../constants";

const workosAuthMiddleware = async (req: any, res: any, next: any) => {
  const token = req.cookies.token;

  try {
    const { payload: user } = await jwtVerify(token, secret);
    if (user) {
      req.user = user.payload;
    }
    next();
  } catch (error) {
    res.clearCookie("token", {
      path: "/",
      sameSite: "lax",
    });

    res.redirect("http://localhost:5173/login");
  }
};

export default workosAuthMiddleware;
