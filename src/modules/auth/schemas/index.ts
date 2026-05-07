import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(2).nonempty(),
  email: z.string().email().nonempty(),
  password: z.string().min(6).nonempty()
})

export const loginSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(6).nonempty()
})