"use client"
import { Box, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useUnit } from "effector-react"

import { Button } from "@/components/ui/button"
import EnhancedTabs from "@/components/ui/enhanced-tabs"
import { $canvas } from "@/app/project/[id]/store"
import { $serviceDetails, closeServiceDetails } from "./store"
import { EnvironmentTab } from "./tabs/environment-tab"
import { SettingsTab } from "./tabs/settings-tab"
import { DangerZone } from "./tabs/danger-zone"
import { DeploymentsTab } from "./tabs/deployments-tab"

export const ServiceDetails = () => {
    const { open, service_id } = useUnit($serviceDetails)
    const [activeTab, setActiveTab] = useState(0)

    const { services } = useUnit($canvas)
    const service = services.find(service => service.id === service_id)

    useEffect(() => {
        if (service) {
            setActiveTab(0)
        }
    }, [service])

    // useEffect(() => {
    //     const handleEscape = (e: KeyboardEvent) => {
    //         if (e.key === 'Escape' && open) {
    //             closeServiceDetails()
    //         }
    //     }

    //     window.addEventListener('keydown', handleEscape)
    //     return () => window.removeEventListener('keydown', handleEscape)
    // }, [open])

    if (!service) return null

    return (
        <div className={`${open ? "right-0" : "right-[-700px]"} min-w-[700px] max-w-[700px] absolute top-16 bottom-0 bg-neutral-900/70 backdrop-blur-sm border-l border-t rounded-tl-xl flex flex-col justify-between transition-all`}>
            <div>
                <div className="flex justify-between px-6 pt-6">
                    <div className="flex items-center gap-2">
                        <Box />
                        <div className="text-xl">
                            {service?.name}
                        </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => closeServiceDetails()}>
                        <X />
                        Close
                    </Button>
                </div>
                <div className="px-6">
                    <EnhancedTabs
                        className="py-4"
                        tabs={["Deployments", "Settings", "Environment", "Danger Zone"]}
                        activeTab={activeTab}
                        onChange={(index) => setActiveTab(index)}
                    />
                </div>
                <div className="max-h-[calc(100vh-200px)] overflow-y-auto px-4 pb-6">
                    {activeTab === 0 && <DeploymentsTab service_id={service_id} />}
                    {activeTab === 1 && <SettingsTab config={service?.deployment.config} serviceId={service_id} />}
                    {activeTab === 2 && <EnvironmentTab service_id={service_id} />}
                    {activeTab === 3 && <DangerZone />}
                </div>
            </div>
            {/* <div className="border-t p-4"> */}

            {/* </div> */}
        </div>
    )
}