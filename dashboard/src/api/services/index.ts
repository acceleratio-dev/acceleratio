import { api } from ".."
import { ServerResponse, Service, Deployment } from "../types";

const baseUrl = "/services"

export const servicesApi = {
    create: async (data: Pick<Service, 'name' | 'projectId'> & { image: string }): Promise<ServerResponse<Service>> => {
        return api.post(`${baseUrl}`, data)
    },
    getProjectServices: async (projectId: string): Promise<ServerResponse<Service[]>> => {
        return api.get(`${baseUrl}/project/${projectId}`)
    },
    getServiceDeployments: async (serviceId: Service['id']): Promise<ServerResponse<Deployment[]>> => {
        return api.get(`${baseUrl}/${serviceId}/deployments`)
    },
    update: async (serviceId: Service['id'], data: Partial<Service>): Promise<ServerResponse<Service>> => {
        return api.put(`${baseUrl}/${serviceId}`, data)
    },
    updateConfig: async (serviceId: Service['id'], data: Partial<Service['deployment']['config']>): Promise<ServerResponse<Service>> => {
        return api.put(`${baseUrl}/${serviceId}/config`, data)
    },
    deploy: async (id: Service['id']): Promise<ServerResponse<{
        message: string
    }>> => {
        return api.get(`${baseUrl}/${id}/deploy`)
    },
    getLogs: async (id: Service['id']): Promise<ServerResponse<string[]>> => {
        return api.get(`${baseUrl}/${id}/logs`)
    },
    stop: async (id: Service['id']): Promise<ServerResponse<{
        message: string
    }>> => {
        return api.get(`${baseUrl}/${id}/stop`)
    }
}