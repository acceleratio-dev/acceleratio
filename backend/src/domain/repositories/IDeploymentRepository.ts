import { CreateDeploymentDto } from "@/application/dto/deployment/create-deployment-dto";
import { deploymentsTable } from "@/infrastructure/db/orm/schema/deployments";


export interface IDeploymentRepository {
    createDeployment(payload: CreateDeploymentDto): Promise<typeof deploymentsTable.$inferSelect>
    getActiveDeployment(serviceId: string): Promise<typeof deploymentsTable.$inferSelect | null>
    getDraftDeployment(serviceId: string): Promise<typeof deploymentsTable.$inferSelect | null>
    updateDeployment(payload: Partial<typeof deploymentsTable.$inferSelect>): Promise<typeof deploymentsTable.$inferSelect>
    getDeploymentById(deploymentId: string): Promise<typeof deploymentsTable.$inferSelect | null>
    updateDraftDeployment(payload: Partial<typeof deploymentsTable.$inferSelect>): Promise<typeof deploymentsTable.$inferSelect>
    getServiceDeployments(serviceId: typeof deploymentsTable.$inferSelect["id"]): Promise<typeof deploymentsTable.$inferSelect[]>
}