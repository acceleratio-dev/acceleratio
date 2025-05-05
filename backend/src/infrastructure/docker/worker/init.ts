import { Worker } from "worker_threads";
import path from "path";
import { serviceWebsocketBroadcastMessage } from "@/interfaces/websocket/service-websocket";
import { DeploymentRepository } from "@/infrastructure/db/deployment-repository";
import { DeploymentTaskStatus } from "@/domain/entities/deployment";

const repository = new DeploymentRepository()

const eventTypes = {
    'start': DeploymentTaskStatus.RUNNING,
    'die': DeploymentTaskStatus.FAILED,
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

        // const service = await repository.getServiceByContainerId(eventData.Actor?.Attributes?.["com.docker.swarm.service.id"])

        // if (service) {
        //     service.status = eventsTypes[eventData.status as keyof typeof eventsTypes]
        //     await repository.updateService(service)
        //     serviceWebsocketBroadcastMessage(JSON.stringify({
        //         event_type: 'service_updated',
        //         payload: {
        //             serviceId: service.id,
        //             status: eventsTypes[eventData.status as keyof typeof eventsTypes],
        //         },
        //         projectId: service.projectId,
        //     }), service.projectId!)
        // }
    });
}
