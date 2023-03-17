import { z } from "zod";

export const userZodSchema = z.object({
  _id: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  avatar: z.string().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  dateOfBirth: z.date().optional(),
  phoneNumber: z
    .string()
    .regex(/^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/)
    .optional(),
  address: z
    .object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      zipCode: z.string().optional(),
    })
    .optional(),
  isActive: z.boolean().default(false),
});

export type IUser = z.infer<typeof userZodSchema>;
