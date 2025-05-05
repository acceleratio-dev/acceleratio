import { z } from "zod"


export const updateServiceMetaSchema = z.object({
    name: z.string().optional(),
    position_x: z.number().optional(),
    position_y: z.number().optional(),
})

export type UpdateServiceMetaDto = z.infer<typeof updateServiceMetaSchema>
