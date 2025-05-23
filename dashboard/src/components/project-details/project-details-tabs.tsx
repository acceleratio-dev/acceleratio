import { History, KeyRound, Server, Settings } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"


const tabs = [
    {
        key: 'services',
        label: 'Services',
        icon: Server
    },
    {
        key: 'deployments',
        label: 'Deployments history',
        icon: History
    },
    {
        key: 'environments',
        label: 'Variables',
        icon: KeyRound
    },
    {
        key: 'settings',
        label: 'Settings',
        icon: Settings
    }
]

export const ProjectDetailsTabs = ({ activeTab }: { activeTab: string }) => {
    return (
        <div className="flex items-center gap-2">
            {
                tabs.map((tab) => (
                <Link
                    href={`/dashboard/projects/1?tab=${tab.key}`}
                    className={cn(
                        "flex items-center gap-2.5 py-3 px-4 text-sm font-medium border-b-2 hover:border-primary transition-all",
                        activeTab === tab.key ? "border-primary text-primary" : "border-transparent"
                    )}
                    key={tab.key}
                >
                    <tab.icon size={14} className={cn("stroke-slate-700", activeTab === tab.key && "stroke-primary")} />
                    {tab.label}
                </Link>
            ))
            }
        </div>
    )
}