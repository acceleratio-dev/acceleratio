import { parentPort, workerData } from "worker_threads";
import { DockerClient } from "@/infrastructure/docker/client";
import { ServiceWebsocketEvents } from "@/interfaces/websocket/websocket-events";
import { Scheduler } from "..";
import { JobsEnum } from "./jobs-enum";

import { ServiceRepository } from "@/infrastructure/db/service-repository";
interface WorkerData {
    jobId: string;
    serviceId: string;
    image: string;
    projectId: string;
}

const { jobId, serviceId, image, projectId } = workerData as WorkerData;
const repository = new ServiceRepository();

const pullImage = async (image: string, tag: string) => {
    const dockerClient = new DockerClient();
    const response = await dockerClient.pullImage(image, tag);
    const reader = response.body.getReader()
    let buf = ''
    const decoder = new TextDecoder()

    while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buf += decoder.decode(value, { stream: true })
        const lines = buf.split(/\r?\n/)
        buf = lines.pop() || ''
        for (const l of lines) {
            if (!l) continue
            const obj = JSON.parse(l)
        }
    }
}

function parseImageAndTag(image: string): { imageName: string, tag: string } {
    const slashIndex = image.lastIndexOf('/')
    const colonIndex = image.lastIndexOf(':')

    if (colonIndex > slashIndex) {
        return {
            imageName: image.slice(0, colonIndex),
            tag: image.slice(colonIndex + 1),
        }
    }

    return {
        imageName: image,
        tag: 'latest',
    }
}

const main = async () => {
    try {
        const { imageName, tag } = parseImageAndTag(image);
        await repository.updateService({
            id: serviceId,
            status: 'pulling',
        })
        parentPort!.postMessage({
            event_type: ServiceWebsocketEvents.SERVICE_UPDATED,
            payload: {
                status: 'pulling',
                serviceId,
            },
            projectId,
        })
        await pullImage(imageName, tag);
        await repository.updateService({
            id: serviceId,
            status: 'pending',
        })
        parentPort!.postMessage({
            event_type: ServiceWebsocketEvents.SERVICE_UPDATED,
            payload: {
                status: 'pending',
                serviceId,
            },
            projectId,
        })
        parentPort!.postMessage({
            spawnJob: {
                type: JobsEnum.RUN_IMAGE,
                data: { serviceId, image, projectId },
            },
        })
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