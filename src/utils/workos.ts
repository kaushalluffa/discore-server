import { WorkOS } from "@workos-inc/node";
import dotenv from "dotenv";
dotenv.config();

export const workos = new WorkOS(process.env.WORKOS_API_KEY);

export const workosClientId = process.env.WORKOS_CLIENT_ID!;
