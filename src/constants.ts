import dotenv from "dotenv";
dotenv.config();

export const BASE_URL = process.env.BASE_URL as string;
export const PORT = process.env.PORT || 8000;
export const COMPLETE_URL = `${BASE_URL}:${PORT}`;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY as string;
export const WORKOS_API_KEY = process.env.WORKOS_API_KEY;
export const WORKOS_CLIENT_ID = process.env.WORKOS_CLIENT_ID;
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
