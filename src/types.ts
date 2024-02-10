import { Request } from "express";

export interface TypedSignupReq extends Request{
  body: {
    email: string,
    password: string,
    name: string,
  }
}