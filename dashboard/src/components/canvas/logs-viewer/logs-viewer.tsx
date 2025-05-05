import { useUnit } from "effector-react"
import { $logsViewer, closeLogsViewer } from "./store"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"


export const LogsViewer = () => {
    const { open, logs } = useUnit($logsViewer)

    return (
        <Dialog open={open} onOpenChange={() => closeLogsViewer()}>
            <DialogContent className="!max-w-[1000px] bg-slate-800/50 shadow-lg shadow-slate-900/25 backdrop-blur-sm p-0">
                <DialogHeader className="p-4 border-b">
                    <DialogTitle className="text-md leading-none">
                        Logs <span className="text-xs uppercase ml-1 bg-amber-100 text-amber-800 px-1 rounded shadow-md shadow-amber-400/30 border border-amber-200">beta</span>
                    </DialogTitle>
                </DialogHeader>
                <div className="h-[500px] overflow-y-auto text-xs px-2">
                    {logs.map((log, index) => (
                        <pre key={index}>{log}</pre>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}