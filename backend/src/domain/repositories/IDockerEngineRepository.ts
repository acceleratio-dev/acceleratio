import { DeploymentConfig } from "../entities/deployment";


export interface IDockerEngineRepository {
    createService(payload: DeploymentConfig & { deploymentId: string }): Promise<string>
}