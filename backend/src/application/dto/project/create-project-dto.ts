import { z } from "zod";


export const createProjectSchema = z.object({
    name: z.string().min(1),
})

export type CreateProjectDTO = z.infer<typeof createProjectSchema>