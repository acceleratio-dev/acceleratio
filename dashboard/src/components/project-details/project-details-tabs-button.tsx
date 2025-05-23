import { useMemo } from "react"
import { Button } from "../ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"


export const ProjectDetailsTabsButton = ({ activeTab }: { activeTab: string }) => {

    const tabButton = useMemo(() => {
        switch (activeTab) {
            case 'services':
                return (
                    <Link href={`/dashboard/projects/1/new-service`}>
                        <Button><Plus />New service</Button>
                    </Link>
                )
            case 'environments':
                return <Button>New environment</Button>
            case 'deployments':
                return <Button>New service</Button>
            case 'settings':
                return <Button>New setting</Button>
            default:
                return <Button>Services</Button>
        }
    }, [activeTab])

    return (
        <div>
            {tabButton}
        </div>
    )
}