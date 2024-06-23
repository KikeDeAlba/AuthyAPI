import { z } from "zod";

export const UnregisterUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    payload: z.any().default({})
})

export const UserSchema = z.object({
    email: z.string().email(),
    password: z.string()
})