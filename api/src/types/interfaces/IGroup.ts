import { z } from "zod";
import { userZodSchema, IUser } from "./IUser";

export const groupZodSchema = z.object({
  _id: z.string(),
  name: z.string(),
  description: z.string(),
  users: z.array(userZodSchema).default([]),
});

export type IGroup = z.infer<typeof groupZodSchema> & IUser;
