import type { IDockerEngineRepository } from "@/domain/repositories/IDockerEngineRepository";
import { ServiceCreateRequest, ServiceUpdateRequest } from "./sdk/models";
import { DeploymentConfig } from "@/domain/entities/deployment";
import { logger } from "../loger";


export class DockerClient implements IDockerEngineRepository {
    private api: (url: string, options: RequestInit) => Promise<any>;

    constructor() {
        const config = {
            basePath: process.env.DOCKER_API_BASE_PATH,
            unix: process.env.DOCKER_SOCKET_PATH,
        };
        this.api = async (url: string, options: RequestInit) => {
            return fetch(config.basePath + url, {
                ...options,
                // @ts-ignore
                unix: config.unix,
            });
        };
    }

    async createService(payload: DeploymentConfig & { deploymentId: string, projectId: string }) {
        const data: ServiceCreateRequest = {
            taskTemplate: {
                containerSpec: {
                    labels: {
                        "acceleratio.deployment.id": payload.deploymentId,
                        "acceleratio.project.id": payload.projectId,
                    },
                    image: payload.image,
                    command: payload.command ? [payload.command] : undefined,
                },
                restartPolicy: {
                    condition: "on-failure",
                    delay: 5000,
                    maxAttempts: 3,
                }
            },
            mode: {
                replicated: {
                    replicas: 1
                }
            }
        }

        try {
            const response = await this.api('/services/create', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const body = await response.json();
            return body.ID;
        } catch (error) {
            logger.error(error);
            throw Error("Failed to create service");
        }
    }

    async deleteService(serviceId: string) {
        await this.api(`/services/${serviceId}`, {
            method: 'DELETE',
        });
    }
}