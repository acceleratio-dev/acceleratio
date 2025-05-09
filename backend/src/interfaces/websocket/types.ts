import { DeploymentTaskStatus } from "@/domain/entities/deployment"

export enum ServiceWebsocketEvents {
    STATUS_UPDATE = 'status_updated',
}

interface ServiceWebsocketStatusUpdateMessage {
    event_type: ServiceWebsocketEvents.STATUS_UPDATE,
    payload: {
        serviceId: string,
        status: DeploymentTaskStatus
    }
}

export type ServiceWebsocketMessage = ServiceWebsocketStatusUpdateMessage