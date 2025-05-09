import { ServiceRepository } from "@/infrastructure/db/service-repository";
import { DockerClient } from "@/infrastructure/docker/client";
import { CreateServiceDto } from "../dto/service/create-service-dto";
import { DeploymentRepository } from "@/infrastructure/db/deployment-repository";
import { DeploymentConfig, DeploymentStatus, DeploymentTaskStatus } from "@/domain/entities/deployment";
import { UpdateServiceConfigDto } from "../dto/service/update-service-config-dto";
import { UpdateServiceMetaDto } from "../dto/service/update-service-meta-dto";
import { serviceWebsocketBroadcastMessage } from "@/interfaces/websocket/service-websocket";
import { ServiceWebsocketEvents } from "@/interfaces/websocket/types";
export class ServiceService {
    private static repository = new ServiceRepository();
    private static deploymentRepository = new DeploymentRepository();
    private static dockerClient = new DockerClient();


    static async getProjectServices(projectId: string) {
        return this.repository.getServicesByProjectId(projectId);
    }

    static async createService(payload: CreateServiceDto) {
        const service = await this.repository.createService(payload);
        await this.deploymentRepository.createDeployment({
            serviceId: service.id,
            name: service.name + " Initial Deployment",
            config: {
                image: payload.image,
            },
        });
        return service;
    }

    static async deployService(serviceId: string) {
        const service = await this.repository.getServiceById(serviceId);

        if (!service) {
            throw new Error("Service not found");
        }

        const deployment = await this.deploymentRepository.getDraftDeployment(serviceId);
        if (!deployment) {
            return {
                message: "No changes to deploy",
            }
        }

        const activeDeployment = await this.deploymentRepository.getActiveDeployment(serviceId);

        if (activeDeployment?.taskId) {
            await this.dockerClient.deleteService(activeDeployment.taskId);
        }

        const taskId = await this.dockerClient.createService({
            ...deployment.config as DeploymentConfig,
            deploymentId: deployment.id,
            projectId: service.projectId!,
        })

        await this.deploymentRepository.updateDraftDeployment({
            ...deployment,
            taskId,
        })

        return {
            message: "Deployment started",
        }
    }

    static async getDeploymentsHistory(serviceId: string) {
        const deployments = await this.deploymentRepository.getServiceDeployments(serviceId);
        return deployments.map((deployment) => ({
            id: deployment.id,
            name: deployment.name,
            status: deployment.status,
            createdAt: deployment.createdAt,
        }));
    }

    static async updateServiceConfig(serviceId: string, payload: UpdateServiceConfigDto) {
        const deployment = await this.deploymentRepository.getDraftDeployment(serviceId);
        if (!deployment) {
            const newDeployment = await this.deploymentRepository.createDeployment({
                serviceId,
                name: "Config Update",
                config: {
                    ...payload,
                } as any,
            });
            return newDeployment.config;
        }

        const updatedDeployment = await this.deploymentRepository.updateDeployment({
            ...deployment,
            config: {
                ...(deployment.config as DeploymentConfig),
                ...payload,
            },
        })

        const service = await this.repository.getServiceById(serviceId);

        serviceWebsocketBroadcastMessage({
            type: ServiceWebsocketEvents.STATUS_UPDATE,
            payload: {
                serviceId: serviceId,
                status: updatedDeployment.taskStatus as DeploymentTaskStatus,
            },
        }, service?.projectId!)

        return updatedDeployment.config;
    }

    static async updateService(serviceId: string, payload: UpdateServiceMetaDto) {
        const service = await this.repository.getServiceById(serviceId);
        if (!service) {
            throw new Error("Service not found");
        }

        const updatedService = await this.repository.updateService({
            ...service,
            ...payload,
        })

        return updatedService;
    }
}