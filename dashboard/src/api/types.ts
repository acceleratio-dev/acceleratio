import { errorMessages } from "@/lib/error-messages";
import { AxiosResponse } from "axios";


export type ServerResponse<T> = AxiosResponse<{
    data: T;
} & ({
    success: true;
    error: null;
} | {
    success: false;
    error: {
        code: keyof typeof errorMessages;
        message: string;
    };
})>

export interface Project {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface Deployment {
    id: string;
    name: string;
    status: DeploymentStatus;
    taskStatus?: DeploymentTaskStatus;
    config: {
        image: string;
        command?: string;
    }
    createdAt: string;
}

export enum DeploymentStatus {
    ACTIVE = "active",
    FINISHED = "finished",
    DRAFT = "draft",
}

export enum DeploymentTaskStatus {
    PULLING = 'pulling',
    PENDING = 'pending',
    RUNNING = 'running',
    FAILED = 'failed',

    // Additional statuses only for frontend to display when the latest deployment is draft and deployment task status not exists
    UPDATING = 'updating',
}

export interface Service {
    id: string;
    projectId: string;
    name: string;
    deployment: Deployment;
    position_x: number;
    position_y: number;
    createdAt: string;
    updatedAt: string;
}