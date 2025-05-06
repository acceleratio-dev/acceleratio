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

export interface Service {
    id: string;
    projectId: string;
    name: string;
    deployment: {
        name: string;
        status: string;
        taskStatus: string;
        config: {
            image: string;
        }
    },
    position_x: number;
    position_y: number;
    createdAt: string;
    updatedAt: string;
}