import { Square, Play, Logs, SquareTerminal } from "lucide-react"
import { Button } from "@/components/ui/button"

export const ServiceActions = ({ id, isEditing, onDeploy, onStop, onLogs }: {
    id: string,
    isEditing: boolean,
    onDeploy: (e: React.MouseEvent) => void,
    onStop: (e: React.MouseEvent) => void,
    onLogs: (e: React.MouseEvent) => void
}) => (
    <div className={`p-4 border-neutral-100 dark:border-neutral-800 flex gap-2
        ${isEditing ? "dark:bg-amber-900/20" : ""}`}>
        <Button
            variant="outline"
            size="icon"
            className="flex items-center gap-1 text-rose-600 dark:text-rose-500 border-rose-200 dark:border-rose-900 hover:bg-rose-50 dark:hover:bg-rose-950"
            onClick={onStop}
        >
            <Square className="w-3.5 h-3.5" />
        </Button>
        <Button
            variant="outline"
            size="icon"
            className="flex items-center gap-1 text-emerald-500 border border-emerald-900 !hover:bg-emerald-800"
            onClick={onDeploy}
        >
            <Play className="w-3.5 h-3.5" />
        </Button>
        <Button onClick={onLogs} size="icon" variant="outline" className="ml-auto">
            <Logs className="w-3.5 h-3.5" />
        </Button>
        {/* <Button onClick={() => {}} size="icon" variant="outline">
            <SquareTerminal className="w-3.5 h-3.5" />
        </Button> */}
    </div>
)