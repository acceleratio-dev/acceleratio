import type { IServiceRepository } from "@/domain/repositories/IServiceRepository";
import type { ServiceWithLatestDeployment } from "@/domain/repositories/IServiceRepository";
import { db } from "./orm/client";
import { eq, desc } from "drizzle-orm";
import { servicesTable } from "./orm/schema/services";
import { deploymentsTable } from "./orm/schema/deployments";
import { CreateServiceDto } from "@/application/dto/service/create-service-dto";

export class ServiceRepository implements IServiceRepository {
    async getServicesByProjectId(projectId: string): Promise<ServiceWithLatestDeployment[]> {
        const services = await db
            .select({
                id: servicesTable.id,
                name: servicesTable.name,
                projectId: servicesTable.projectId,
                position_x: servicesTable.position_x,
                position_y: servicesTable.position_y,
                createdAt: servicesTable.createdAt,
                updatedAt: servicesTable.updatedAt,
                latestDeployment: {
                    status: deploymentsTable.status,
                    taskStatus: deploymentsTable.taskStatus,
                    name: deploymentsTable.name,
                    config: deploymentsTable.config,
                    createdAt: deploymentsTable.createdAt,
                    updatedAt: deploymentsTable.updatedAt
                }
            })
            .from(servicesTable)
            .leftJoin(
                deploymentsTable,
                eq(servicesTable.id, deploymentsTable.serviceId)
            )
            .where(eq(servicesTable.projectId, projectId))
            .orderBy(desc(deploymentsTable.createdAt));

        return services
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
