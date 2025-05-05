import { z } from "zod"

export const deleteProjectSchema = z.object({
    id: z.string().uuid()
})

export type DeleteProjectDTO = z.infer<typeof deleteProjectSchema>