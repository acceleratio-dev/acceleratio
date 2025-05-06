import type { IServiceRepository } from "@/domain/repositories/IServiceRepository";
import type { ServiceWithLatestDeployment } from "@/domain/repositories/IServiceRepository";
import { db } from "./orm/client";
import { eq, desc, and, or } from "drizzle-orm";
import { servicesTable } from "./orm/schema/services";
import { deploymentsTable } from "./orm/schema/deployments";
import { CreateServiceDto } from "@/application/dto/service/create-service-dto";
import { DeploymentStatus } from "@/domain/entities/deployment";

export class ServiceRepository implements IServiceRepository {
    async getServicesByProjectId(projectId: string): Promise<ServiceWithLatestDeployment[]> {
        const services = await db.select().from(servicesTable).where(eq(servicesTable.projectId, projectId))

        const servicesWithLatestDeployment = await Promise.all(services.map(async (service) => {
            const [latestDeployment] = await db.select().from(deploymentsTable).where(and(eq(deploymentsTable.serviceId, service.id), or(eq(deploymentsTable.status, DeploymentStatus.DRAFT), eq(deploymentsTable.status, DeploymentStatus.ACTIVE)))).orderBy(desc(deploymentsTable.createdAt)).limit(1)
            return {
                ...service,
                deployment: {
                    status: latestDeployment.status,
                    taskStatus: latestDeployment.taskStatus,
                    config: latestDeployment.config,
                }
            }
        }))

        return servicesWithLatestDeployment
    }

    async createService(payload: CreateServiceDto): Promise<typeof servicesTable.$inferSelect> {
        const [service] = await db.insert(servicesTable).values(payload).returning();
        return service;
    }

    async getServiceById(id: string): Promise<typeof servicesTable.$inferSelect | null> {
        const [service] = await db.select().from(servicesTable).where(eq(servicesTable.id, id));
        return service || null;
    }

    async updateService(payload: Partial<typeof servicesTable.$inferSelect>): Promise<typeof servicesTable.$inferSelect> {
        const [service] = await db.update(servicesTable).set(payload).where(eq(servicesTable.id, payload.id!)).returning();
        return service;
    }
}
