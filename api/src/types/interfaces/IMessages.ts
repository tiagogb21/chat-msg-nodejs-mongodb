import { z } from "zod";
import { userZodSchema } from "./IUser";

export const messageZodSchema = z.object({
  _id: z.string(),
  senderId: userZodSchema.pick({ _id: true }),
  recipientId: userZodSchema.pick({ _id: true }),
  content: z.string(),
  createdAt: z.date(),
});

export type IMessage = z.infer<typeof messageZodSchema>;
