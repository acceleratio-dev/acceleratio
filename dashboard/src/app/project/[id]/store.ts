"use client"
import { servicesApi } from "@/api/services"
import { Service } from "@/api/types"
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

export const updateServiceFx = createEffect(servicesApi.update)
$canvas.on(updateServiceFx.doneData, (state, { data }) => {
    if (!data.success) {
        toast.error(data.error.message)
        return state
    }

    const project = data.data

    return {
        ...state,
        services: [...state.services.filter(service => service.id !== project.id), project]
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
