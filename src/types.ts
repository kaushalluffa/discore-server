import { Request } from "express";

export interface TypedSignupReq extends Request {
  body: {
    email: string;
    password: string;
    name: string;
  };
}
export interface TypedCreateServerReq extends Request {
  body: {
    profileId: string;
    imageUrl: string;
    name: string;
  };
}
