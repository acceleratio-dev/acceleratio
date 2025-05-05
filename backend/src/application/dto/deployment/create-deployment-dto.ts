import { z } from "zod";


export const createDeploymentSchema = z.object({
    serviceId: z.string(),
    name: z.string(),
    config: z.object({
        image: z.string(),
    }),
})

export type CreateDeploymentDto = z.infer<typeof createDeploymentSchema>