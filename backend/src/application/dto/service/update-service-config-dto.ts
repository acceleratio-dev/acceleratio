import { z } from "zod";


export const updateServiceConfigSchema = z.object({
    image: z.string().optional(),
    command: z.string().optional(),
})

export type UpdateServiceConfigDto = z.infer<typeof updateServiceConfigSchema>