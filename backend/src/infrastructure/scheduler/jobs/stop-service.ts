import { ServiceService } from "@/application/services/service-service";
import { servicesTable } from "@/infrastructure/db/drizzle/schema/services";
import { DockerClient } from "@/infrastructure/docker/client";
import { ServiceWebsocketEvents } from "@/interfaces/websocket/websocket-events";
import { parentPort, workerData } from "worker_threads";

interface WorkerData {
    jobId: string;
    serviceId: string;
}

const { jobId, serviceId } = workerData as WorkerData;

const stopService = async (service: typeof servicesTable.$inferSelect) => {
    const dockerClient = new DockerClient();
    await dockerClient.stopService(service.dockerContainerId!);
    await ServiceService.update({
        id: service.id,
        dockerContainerId: null,
        status: "stopped"
    })
}


const main = async () => {
    const service = await ServiceService.getServiceById(serviceId);
    if (!service || !service.dockerContainerId) {
        throw new Error("Service not found");
    }
    try {
        await stopService(service);
        parentPort!.postMessage({
            event_type: ServiceWebsocketEvents.SERVICE_UPDATED,
            payload: {
                status: 'stopped',
                serviceId,
            },
            projectId: service.projectId,
        })
    } catch (error) {
        console.log(error)
        parentPort!.postMessage({
            event_type: ServiceWebsocketEvents.SERVICE_UPDATED,
            payload: {
                status: 'failed',
                serviceId,
            },
            projectId: service.projectId,
        });
    }
}

main()