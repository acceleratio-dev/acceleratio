import { toast } from "sonner"
import { openLogsViewer } from "../logs-viewer/store"
import { servicesApi } from "@/api/services"


export const useServiceNode = (id: string) => {
    const handleDeploy = async (e: React.MouseEvent) => {
        e.stopPropagation()
        const { data } = await servicesApi.deploy(id)
        toast.info(data.data.message)
    }

    const handleStop = async (e: React.MouseEvent) => {
        e.stopPropagation()
        const { data } = await servicesApi.stop(id)
        if (data.success) {
            toast.info(data.data.message)
        } else {
            toast.error(data.error.message)
        }
    }

    const handleLogs = (e: React.MouseEvent) => {
        e.stopPropagation()
        openLogsViewer(id)
    }

    return {
        handleDeploy,
        handleStop,
        handleLogs
    }
}