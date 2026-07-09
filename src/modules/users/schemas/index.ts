import { z } from "zod"

// TODO: VIRAR SCHEMA DE UPDATE
export const createUserSchema = z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    role: z.enum(["ADMIN", "USER"]).optional(),
    status: z.enum(["ACTIVE", "INACTIVE"]).optional()
})