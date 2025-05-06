import { Badge } from "@/components/ui/badge"
import { Server } from "lucide-react"

const STATUS_CONFIG = {
    'running': {
        color: "bg-emerald-500",
        label: "Running",
        bgColor: "bg-emerald-50 dark:bg-emerald-950",
        textColor: "text-emerald-700 dark:text-emerald-300"
    },
    created: {
        color: "bg-blue-500",
        label: "Created",
        bgColor: "bg-blue-50 dark:bg-blue-950",
        textColor: "text-blue-700 dark:text-blue-300"
    },
    failed: {
        color: "bg-rose-500",
        label: "Failed",
        bgColor: "bg-rose-50 dark:bg-rose-950",
        textColor: "text-rose-700 dark:text-rose-300"
    },
    pulling: {
        color: "bg-sky-500",
        label: "Pulling",
        bgColor: "bg-sky-50 dark:bg-sky-950",
        textColor: "text-sky-700 dark:text-sky-300"
    },
    pending: {
        color: "bg-amber-500",
        label: "Pending",
        bgColor: "bg-amber-50 dark:bg-amber-950",
        textColor: "text-amber-700 dark:text-amber-300"
    },
    stopped: {
        color: "bg-neutral-400",
        label: "Stopped",
        bgColor: "bg-neutral-50 dark:bg-neutral-900",
        textColor: "text-neutral-700 dark:text-neutral-300"
    },
    exited: {
        color: "bg-neutral-400",
        label: "Exited",
        bgColor: "bg-neutral-50 dark:bg-neutral-900",
        textColor: "text-neutral-700 dark:text-neutral-300"
    },
} as const

export type ServiceStatus = keyof typeof STATUS_CONFIG

export const ServiceHeader = ({ label, image, isEditing }: { label: string, image: string, isEditing: boolean }) => (
    <div className="flex items-center gap-3">
        <div
            className={`p-2 rounded-md
            ${isEditing ? "bg-amber-100/50 dark:bg-amber-900/20" : "bg-neutral-100 dark:bg-neutral-800"}`}
        >
            <Server
                className={`w-5 h-5
                ${isEditing ? "text-amber-500 dark:text-amber-400" : "text-neutral-500 dark:text-neutral-400"}`}
            />
        </div>
        <div>
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100">{label || "Docker service"}</h3>
            <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">{image}</div>
        </div>
    </div>
)

export const ServiceStatusBadge = ({ status }: { status: ServiceStatus }) => (
    <div>
        <Badge className={`${STATUS_CONFIG[status]?.bgColor} ${STATUS_CONFIG[status]?.textColor} border-0`}>
            <div
                className={`w-1.5 h-1.5 ${STATUS_CONFIG[status]?.color} rounded-full ${status === "running" ? "animate-pulse" : ""}`}
            />
            <span className="text-xs ml-1">{STATUS_CONFIG[status]?.label}</span>
        </Badge>
    </div>
)