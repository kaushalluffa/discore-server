import { jwtVerify } from "jose";
import { JWT_SECRET_KEY } from "../constants";
const secret = new Uint8Array(Buffer.from(JWT_SECRET_KEY, "base64"));

const workosAuthMiddleware = async (req: any, res: any, next: any) => {
  const token = req.cookies.token;
  let verifiedToken;
  try {
    verifiedToken = await jwtVerify(token, secret);
    if (verifiedToken) {
      req.user = verifiedToken.payload.user;
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
