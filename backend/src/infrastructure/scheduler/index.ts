import Bree from "bree";
import { JobsEnum } from "./jobs/jobs-enum";
import path from "path";
import { v4 as uuidv4 } from 'uuid';
import { serviceWebsocketBroadcastMessage } from "@/interfaces/websocket/service-websocket";

const bree = new Bree({
    root: false,
    jobs: [],
    workerMessageHandler({ message }) {
        if (!message) return;
        if (message.event_type) {
            serviceWebsocketBroadcastMessage(JSON.stringify(message), message.projectId);
        }
        if (message.spawnJob) {
            Scheduler.runJob(message.spawnJob.type, message.spawnJob.data);
        }
    },
    worker: {
        workerData: {},
        transferList: [],
    }
});

export class Scheduler {
    private static client = bree;

    static async start() {
        await this.client.start();
    }

    static async stop() {
        await this.client.stop();
    }

    static async runJob(type: JobsEnum, workerData?: any) {
        const jobId = uuidv4();

        await this.client.add({
            name: jobId,
            path: path.join(__dirname, "jobs", `${type}.ts`),
            worker: {
                workerData: {
                    jobId,
                    ...workerData,
                },
            },
        });
        this.client.start(jobId);

        return jobId;
    }
}