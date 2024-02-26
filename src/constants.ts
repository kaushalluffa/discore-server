import dotenv from "dotenv";
dotenv.config();

export const BASE_URL = process.env.BASE_URL as string;
export const PORT = process.env.PORT || 8000;
export const COMPLETE_URL = `${BASE_URL}:${PORT}`;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
export const COOKIE_DURATION = process.env.COOKIE_DURATION as string;
export const CLIENT_URL = process.env.CLIENT_URL as string;
export const SIGNUP_SUCCESS_CLIENT_REDIRECT_PATH = process.env
  .SIGNUP_SUCCESS_CLIENT_REDIRECT_PATH as string;
export const CLIENT_EXPIRED_TOKEN_URL = process.env
  .CLIENT_EXPIRED_TOKEN_URL as string;
export const VALIDATION_MSGS = {
  NO_EMAIL: "NO EMAIL PROVIDED",
  NO_PASSWORD: "NO PASSWORD PROVIDED",
  NO_TOKEN: "NO TOKEN PROVIDED",
  NO_NAME: "NO NAME PROVIDED",
  VALIDATED: "VALIDATED",
};
export const VALIDATION_TYPES = {
  SIGNUP_REQ: "signupReq",
  LOGIN_REQ: "loginReq",
};
export const secret = new Uint8Array(Buffer.from(JWT_SECRET_KEY, "base64"));