import { z } from "zod";


export const createServiceSchema = z.object({
    name: z.string().min(1),
    image: z.string().min(1),
    projectId: z.string().min(1),
})

export type CreateServiceDto = z.infer<typeof createServiceSchema>