import { z } from "zod";

export const singupValidation = z.object({
    name: z.string().min(2, {message: 'Too Short'}),
    username: z.string().min(2, {message: 'Too short'}),
    email: z.string().email(),
    password: z.string().min(8, {message: 'Password must be of 8 charaters.'}),
  })