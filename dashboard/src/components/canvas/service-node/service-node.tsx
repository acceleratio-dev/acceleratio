"use client"

import { useUnit } from "effector-react"
import { $serviceDetails, openServiceDetails } from "../service-details/store"
import { useServiceNode } from "./use-service-node"
import { ServiceHeader, ServiceStatusBadge, ServiceStatus } from "./service-header"
import { ServiceActions } from "./service-action"

interface ServiceNodeProps {
    data: {
        id: string
        label: string
        image?: string
        status?: ServiceStatus
    }
}

export const ServiceNode = ({ data }: ServiceNodeProps) => {
    const { service_id } = useUnit($serviceDetails)
    const {
        id,
        label,
        image = "",
        status = "created",
    } = data

    const isEditing = service_id === id
    const { handleDeploy, handleStop, handleLogs } = useServiceNode(id)

    return (
        <div
            className={`w-80 rounded-xl bg-white dark:bg-neutral-900 overflow-hidden transition-all duration-200 ease-in-out
                ${isEditing
                    ? "border border-amber-300 dark:border-amber-800 shadow-md"
                    : "border border-neutral-200 dark:border-neutral-800 shadow-sm"
                }`}
            onClick={() => openServiceDetails(id)}
        >
            <div
                className={`p-4
                ${isEditing
                        ? "border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10"
                        : "border-neutral-100 dark:border-neutral-800"
                    }`}
            >
                <div className="flex justify-between">
                    <ServiceHeader label={label} image={image} isEditing={isEditing} />
                    <ServiceStatusBadge status={status} />
                </div>
            </div>
            <ServiceActions
                id={id}
                isEditing={isEditing}
                onDeploy={handleDeploy}
                onStop={handleStop}
                onLogs={handleLogs}
            />
        </div>
    )
}