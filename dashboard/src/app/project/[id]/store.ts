"use client"
import { servicesApi } from "@/api/services"
import { DeploymentStatus, DeploymentTaskStatus, Service } from "@/api/types"
import { createEffect, createEvent, createStore } from "effector"
import { toast } from "sonner"
interface Store {
    project_id: string | null
    services: Service[]
}

export const $canvas = createStore<Store>({
    project_id: null,
    services: []
})

export const setCanvasData = createEvent<Partial<Store>>()
$canvas.on(setCanvasData, (state, data) => ({
    ...state,
    ...data
}))

export const updateServiceFx = createEffect((params: { serviceId: string, data: Partial<Service> }) =>
    servicesApi.update(params.serviceId, params.data)
)
$canvas.on(updateServiceFx.doneData, (state, { data }) => {
    if (!data.success) {
        toast.error(data.error.message)
        return state
    }

    const project = data.data

    return {
        ...state,
        services: state.services.map(service => {
            if (service.id === project.id) {
                return {
                    ...service,
                    ...project
                }
            }

            return service
        })
    }
})

export const updateService = createEvent<Partial<Service>>()
$canvas.on(updateService, (state, data) => ({
    ...state,
    services: state.services.map(service => service.id === data.id ? { ...service, ...data } : service)
}))

export const addService = createEvent<Service>()
$canvas.on(addService, (state, data) => ({
    ...state,
    services: [...state.services, data]
}))

export const clearStore = createEvent()
$canvas.on(clearStore, () => ({
    project_id: null,
    services: []
}))

export const updateServiceStatus = createEvent<{ serviceId: string, status: DeploymentTaskStatus }>()
$canvas.on(updateServiceStatus, (state, { serviceId, status }) => ({
    ...state,
    services: state.services.map(service => service.id === serviceId ? { ...service, deployment: { ...service.deployment, taskStatus: status } } : service)
}))

export const updateServiceConfigFx = createEffect(async (params: { serviceId: string, data: Partial<Service['deployment']['config']> }) => {
    try {
        const { data } = await servicesApi.updateConfig(params.serviceId, params.data)
        if (!data.success) {
            throw new Error(data.error.message)
        }
        toast.success("Service config updated successfully")
        return params.serviceId
    } catch (error) {
        toast.error("Failed to update service config")
        return null
    }
})

$canvas.on(updateServiceConfigFx.doneData, (state, serviceId) => {
    return {
        ...state,
        services: state.services.map(
            service => service.id === serviceId ? {
                ...service, deployment: { ...service.deployment, status: DeploymentStatus.DRAFT, taskStatus: undefined }
            } : service
        )
    }
})
