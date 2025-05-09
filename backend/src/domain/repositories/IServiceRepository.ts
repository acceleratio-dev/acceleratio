import { servicesTable } from "@/infrastructure/db/orm/schema/services";
import { deploymentsTable } from "@/infrastructure/db/orm/schema/deployments";
import { CreateServiceDto } from "@/application/dto/service/create-service-dto";

export type ServiceWithLatestDeployment = typeof servicesTable.$inferSelect & {
    deployment: Partial<typeof deploymentsTable.$inferSelect> | null
}

export interface IServiceRepository {
    getServicesByProjectId(projectId: string): Promise<ServiceWithLatestDeployment[]>
    createService(payload: CreateServiceDto): Promise<typeof servicesTable.$inferSelect>
    getServiceById(id: string): Promise<typeof servicesTable.$inferSelect | null>
    updateService(payload: Partial<typeof servicesTable.$inferSelect>): Promise<typeof servicesTable.$inferSelect>
}