import { z } from "zod";

export const UnregisterUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    payload: z.any().default({}),
    bussinessCode: z.string()
})

export const UserSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    bussinessCode: z.string()
})