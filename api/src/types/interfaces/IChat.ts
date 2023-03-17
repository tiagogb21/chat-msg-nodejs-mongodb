import { z } from "zod";
import { messageZodSchema } from "./IMessages";

export const chatZodSchema = z.object({
  _id: z.string(),
  groupId: z.string(),
  messages: messageZodSchema.pick({ _id: true }),
});

export type IChat = z.infer<typeof chatZodSchema>;
