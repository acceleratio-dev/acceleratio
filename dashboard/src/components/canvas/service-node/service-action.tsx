import { Square, Logs, DiamondPlus, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeploymentTaskStatus } from "@/api/types"


export const ServiceActions = ({ status, isEditing, onDeploy, onLogs }: {
    status: DeploymentTaskStatus,
    isEditing: boolean,
    onDeploy: (e: React.MouseEvent) => void,
    onLogs: (e: React.MouseEvent) => void
}) => (
    <div className={`p-4 border-neutral-100 dark:border-neutral-800 flex gap-2
        ${isEditing ? "dark:bg-amber-900/20" : ""}`}>
        {
            status === DeploymentTaskStatus.UPDATING && (
                <Button onClick={onDeploy} variant="outline" size="sm">
                    <DiamondPlus />
                    Deploy changes
                </Button>
            )
        }
        <Button onClick={onLogs} size="icon" variant="outline" className="ml-auto">
            <Logs />
        </Button>
        {/* <Button onClick={() => {}} size="icon" variant="outline">
            <SquareTerminal className="w-3.5 h-3.5" />
        </Button> */}
    </div>
)