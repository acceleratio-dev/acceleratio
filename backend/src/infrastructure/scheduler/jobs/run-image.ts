import { DockerClient } from "@/infrastructure/docker/client";
import { ServiceWebsocketEvents } from "@/interfaces/websocket/websocket-events";
import { ServiceRepository } from "@/infrastructure/db/service-repository";
import { parentPort, workerData } from "worker_threads";

interface WorkerData {
    jobId: string;
    serviceId: string;
    image: string;
    projectId: string;
}

const { jobId, serviceId, image, projectId } = workerData as WorkerData;
const repository = new ServiceRepository();


const runImage = async (image: string) => {
    const dockerClient = new DockerClient();
    const containerId = await dockerClient.createService(image);
    if (!containerId) {
        throw new Error("Failed to create container");
    }
    
    await repository.updateService({
        id: serviceId,
        dockerContainerId: containerId,
        status: 'running',
    })
    parentPort!.postMessage({
        event_type: ServiceWebsocketEvents.SERVICE_UPDATED,
        payload: {
            status: 'running',
            serviceId,
        },
        projectId,
    })
}

const main = async () => {
    try {
        await runImage(image);
    } catch (error) {
        await repository.updateService({
            id: serviceId,
            status: 'failed',
        })
        parentPort!.postMessage({
            event_type: ServiceWebsocketEvents.SERVICE_UPDATED,
            payload: {
                status: 'failed',
                serviceId,
            },
            projectId,
        })
    }
}

main();
