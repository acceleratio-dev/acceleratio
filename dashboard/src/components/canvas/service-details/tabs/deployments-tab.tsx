import { Deployment } from "@/api/types"
import { useState, useEffect, useMemo } from "react"
import { servicesApi } from "@/api/services"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DiamondPlus, History, Pause, Loader2 } from "lucide-react"

export const DeploymentsTab = ({ service_id }: { service_id: string }) => {
    const [data, setData] = useState<Deployment[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        servicesApi.getServiceDeployments(service_id).then(({ data }) => {
            if (data.success) {
                setData(data.data)
            }
        }).finally(() => {
            setIsLoading(false)
        })

        return () => {
            setData([])
            setIsLoading(false)
        }
    }, [service_id])

    const deployments = useMemo(() => {
        return {
            "Draft": data.filter((deployment) => deployment.status === "draft"),
            "Active": data.filter((deployment) => deployment.status === "active"),
            "History": data.filter((deployment) => deployment.status === "finished"),
        }
    }, [data])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-32">
                <Loader2 className="h-8 w-8 animate-spin text-neutral-400" />
            </div>
        )
    }

    return (
        <div className="space-y-4 pt-2">
            {
                Object.entries(deployments).map(([status, deployments]) => {
                    if (deployments.length === 0) return null

                    return (
                        <div className="space-y-2" key={status}>
                            <div className="text-md text-white/80 font-medium pl-2">{status}</div>
                            <div className="space-y-4">
                                {deployments.map((deployment) => (
                                    <DeploymentItem key={deployment.id} deployment={deployment} />
                                ))}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

const deploymentStatusBadge = {
    'active': 'bg-emerald-700 text-emerald-100',
    'draft': 'bg-amber-700 text-amber-100',
    'finished': 'bg-neutral-800 text-neutral-400',
}

const deploymentStatusContainer = {
    'active': 'bg-emerald-700/15 border-emerald-900',
    'draft': 'bg-amber-700/15 border-amber-900',
    'finished': 'bg-zinc-800 border-zinc-700 opacity-70',
}

const DeploymentItem = ({ deployment }: { deployment: Deployment }) => {

    return (
        <div className={`flex items-center border rounded-md p-4 ${deploymentStatusContainer[deployment.status as keyof typeof deploymentStatusContainer]}`}>
            <div className="w-22">
                <Badge variant="outline" className={`uppercase rounded-sm ${deploymentStatusBadge[deployment.status as keyof typeof deploymentStatusBadge]}`}>{deployment.status}</Badge>
            </div>
            <div>
                <div>{deployment.name}</div>
                <div className="text-sm text-neutral-400">
                    {new Date(deployment.createdAt).toLocaleString()}
                </div>
            </div>
            <div className="ml-auto">
                {deployment.status === 'draft' && (
                    <Button variant="outline" size="sm" className="bg-zinc-800/15 hover:bg-zinc-800/25 text-zinc-100 border-zinc-700">
                        <DiamondPlus />
                        Deploy changes
                    </Button>
                )}
                {deployment.status === 'active' && (
                    <Button variant="outline" size="sm" className="bg-zinc-800/15 hover:bg-zinc-800/25 text-zinc-100 border-zinc-700">
                        <Pause className="fill-white stroke-0" />
                        Stop
                    </Button>
                )}
                {deployment.status === 'finished' && (
                    <Button variant="outline" size="sm" className="bg-zinc-800/15 hover:bg-zinc-800/25 text-zinc-100 border-zinc-700">
                        <History />
                        Rollback
                    </Button>
                )}
            </div>
        </div>
    )
}