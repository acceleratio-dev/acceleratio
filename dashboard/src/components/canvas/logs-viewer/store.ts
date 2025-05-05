import { servicesApi } from "@/api/services";
import { createEffect, createEvent, createStore, sample } from "effector";
import { toast } from "sonner";

interface LogsViewerState {
    open: boolean
    serviceId: string | null,
    logs: string[]
}

export const $logsViewer = createStore<LogsViewerState>({
    open: false,
    serviceId: null,
    logs: []
})

export const openLogsViewer = createEvent<string>()
$logsViewer.on(openLogsViewer, (state, serviceId) => ({
    ...state,
    open: true,
    serviceId,
}))

const fetchLogsFx = createEffect(async (serviceId: string) => {
    const response = await servicesApi.getLogs(serviceId)

    if (response.data.success) {
        return response.data.data
    }
    toast.error("Failed to fetch logs")
    return []
})

$logsViewer.on(fetchLogsFx.doneData, (state, logs) => ({
    ...state,
    logs
}))
sample({
    clock: openLogsViewer,
    source: $logsViewer,
    fn: (state) => state.serviceId!,
    target: fetchLogsFx,
})

export const closeLogsViewer = createEvent()
$logsViewer.on(closeLogsViewer, (state) => ({
    ...state,
    open: false,
    logs: []
}))
