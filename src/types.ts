import { Request } from "express";
export interface Profile {
  id: string;
  email: string;
  imageUrl: string;
  name: string;
}
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
  profile?: Profile;
}
export interface TypedGetChannelReq extends Request {
  body: {
    serverId: string;
  };
  profile?: Profile;
}
export interface TypedCreateChannelReq extends Request {
  body: {
    serverId: string;
    name: string;
    type: "VIDEO" | "TEXT" | "AUDIO";
  };
  profile?: Profile;
}
