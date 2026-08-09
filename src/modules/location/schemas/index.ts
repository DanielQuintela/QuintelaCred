import z from "zod";


export const CreateLocationSchema = z.object({
    name: z.string().min(1),
    city: z.string().optional(),
    state: z.string().max(2).optional(),
})