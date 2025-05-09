import { Worker } from "worker_threads";
import path from "path";
import { serviceWebsocketBroadcastMessage } from "@/interfaces/websocket/service-websocket";
import { DeploymentRepository } from "@/infrastructure/db/deployment-repository";
import { DeploymentTaskStatus } from "@/domain/entities/deployment";
import { ServiceWebsocketEvents } from "@/interfaces/websocket/types";

const repository = new DeploymentRepository()

const eventTypes = {
    'start': DeploymentTaskStatus.RUNNING,
    'die': DeploymentTaskStatus.FAILED,
    'create': DeploymentTaskStatus.PENDING,
}

export const initDockerWorker = () => {
    const worker = new Worker(path.resolve(__dirname, 'worker.ts'), {
        workerData: {},
        transferList: [],
    })

    worker.on('message', async (eventData: any) => {
        if (!eventData.deploymentId) return;
        const deployment = await repository.getDeploymentById(eventData.deploymentId)
        if (!deployment) return;

        deployment.taskStatus = eventTypes[eventData.status as keyof typeof eventTypes]
        await repository.updateDeployment(deployment)

        serviceWebsocketBroadcastMessage({
            event_type: ServiceWebsocketEvents.STATUS_UPDATE,
            payload: {
                serviceId: deployment.serviceId!,
                status: deployment.taskStatus as DeploymentTaskStatus,
            },
        }, eventData.projectId!)
    });
}
