import express, { Response } from "express";
import dotenv from "dotenv";
import { TypedSignupReq } from "../types";
import validate from "../utils/validate";
import {
  COOKIE_DURATION,
  SIGNUP_SUCCESS_CLIENT_REDIRECT_PATH,
  VALIDATION_MSGS,
  VALIDATION_TYPES,
} from "../constants";
import { signupHandler, loginHandler } from "../models/authModel";

dotenv.config();

const authRouter = express
  .Router()
  .post("/auth/signup", async (req: TypedSignupReq, res: Response) => {
    if (!req?.body) {
      return res
        .status(400)
        .json({ success: false, message: "Request body missing" });
    }
    const { email, password, name } = req?.body;
    console.log(req?.body, "body");
    const validateMsg = validate(
      { email, name, password },
      VALIDATION_TYPES.SIGNUP_REQ
    );
    if (validateMsg !== VALIDATION_MSGS.VALIDATED) {
      return res.status(400).json({ success: false, message: validateMsg });
    }
    try {
      const data = await signupHandler({ email, password, name });
      if (data && data?.success) {
        res
          .status(201)
          .cookie("token", data?.token)
          .json({
            success: true,
            redirect: SIGNUP_SUCCESS_CLIENT_REDIRECT_PATH,
          });
      } else {
        res.status(400).json({ success: false, message: data?.message });
      }
    } catch (error) {
      console.log(error);
    }
  })
  .post("/auth/login", async (req: TypedSignupReq, res: Response) => {
    if (!req?.body) {
      return res
        .status(400)
        .json({ success: false, message: "Request body missing" });
    }
    const { email, password } = req?.body;
    const validateMsg = validate(
      { email, password },
      VALIDATION_TYPES.LOGIN_REQ
    );
    if (validateMsg !== VALIDATION_MSGS.VALIDATED) {
      return res.status(400).json({ success: false, message: validateMsg });
    }
    try {
      const data = await loginHandler({ email, password });
      if (data && data?.success) {
        res.cookie("token", data?.token, { maxAge: Number(COOKIE_DURATION) });
        res.status(201).json({ success: true, redirect: "/" });
      } else {
        res.status(400).json({ success: false, message: data?.message });
      }
    } catch (error) {
      console.log(error);
    }
  });
export default authRouter;
