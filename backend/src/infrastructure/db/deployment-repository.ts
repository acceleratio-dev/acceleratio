import { IDeploymentRepository } from "@/domain/repositories/IDeploymentRepository";
import { db } from "./orm/client";
import { deploymentsTable } from "./orm/schema/deployments";
import { CreateDeploymentDto } from "@/application/dto/deployment/create-deployment-dto";
import { eq, and, desc } from "drizzle-orm";
import { DeploymentStatus } from "@/domain/entities/deployment";

export class DeploymentRepository implements IDeploymentRepository {
    async createDeployment(payload: CreateDeploymentDto): Promise<typeof deploymentsTable.$inferSelect> {
        const [deployment] = await db.insert(deploymentsTable).values(payload).returning();
        return deployment;
    }

    async getActiveDeployment(serviceId: string): Promise<typeof deploymentsTable.$inferSelect | null> {
        const [deployment] = await db.select().from(deploymentsTable).where(
            and(
                eq(deploymentsTable.serviceId, serviceId),
                eq(deploymentsTable.status, DeploymentStatus.ACTIVE)
            )
        );
        return deployment || null;
    }

    async getDraftDeployment(serviceId: string): Promise<typeof deploymentsTable.$inferSelect | null> {
        const [deployment] = await db.select().from(deploymentsTable).where(
            and(
                eq(deploymentsTable.serviceId, serviceId),
                eq(deploymentsTable.status, DeploymentStatus.DRAFT)
            )
        );
        return deployment || null;
    }

    async updateDeployment(payload: Partial<typeof deploymentsTable.$inferSelect>): Promise<typeof deploymentsTable.$inferSelect> {
        const [deployment] = await db.update(deploymentsTable).set(payload).where(eq(deploymentsTable.id, payload.id!)).returning();
        return deployment;
    }

    async getDeploymentById(deploymentId: string): Promise<typeof deploymentsTable.$inferSelect | null> {
        const [deployment] = await db.select().from(deploymentsTable).where(eq(deploymentsTable.id, deploymentId));
        return deployment || null;
    }

    async updateDraftDeployment(payload: Partial<typeof deploymentsTable.$inferSelect>): Promise<typeof deploymentsTable.$inferSelect> {
        await db.update(deploymentsTable).set({
            status: DeploymentStatus.FINISHED,
            taskId: null,
        }).where(
            and(
                eq(deploymentsTable.serviceId, payload.serviceId!),
                eq(deploymentsTable.status, DeploymentStatus.ACTIVE)
            )
        )

        const [deployment] = await db.update(deploymentsTable).set({
            ...payload,
            status: DeploymentStatus.ACTIVE,
        }).where(eq(deploymentsTable.id, payload.id!)).returning()

        return deployment;
    }

    async getServiceDeployments(serviceId: typeof deploymentsTable.$inferSelect["id"]): Promise<typeof deploymentsTable.$inferSelect[]> {
        return await db.select().from(deploymentsTable).where(eq(deploymentsTable.serviceId, serviceId)).orderBy(desc(deploymentsTable.createdAt));
    }
}