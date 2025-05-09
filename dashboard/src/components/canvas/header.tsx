import { ArrowLeft, Plus } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"
import { CreateServiceModal } from "./create-service-modal"
import { memo } from "react"
import { Project } from "@/api/types"

export const CanvasHeader = memo(({ name }: { name: Project['name'] }) => {
    return (
        <div className="absolute top-0 left-0 w-full z-10 h-12 bg-neutral-900 border-b backdrop-blur-sm shadow-md flex items-center px-2">
            <Link href="/dashboard" className="flex items-center">
                <Button variant="outline" className="!bg-zinc-800/80" size="icon">
                    <img src="/logo.svg" alt="logo" className="w-4 h-4" />
                </Button>
                <div className="ml-2 text-sm text-white font-medium">
                    {name}
                </div>
            </Link>

            <div className="ml-auto">
                <CreateServiceModal />
            </div>
        </div>
    )
})