import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  role: z.enum(["ADMIN", "USER"]),
  status: z.enum(["ACTIVE", "INACTIVE"])
})

export const loginSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(6).nonempty()
})

export const registerAdminSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(100),
  role: z.enum(["ADMIN", "USER"]).default("ADMIN"),
  key: z.string().nonempty()
})