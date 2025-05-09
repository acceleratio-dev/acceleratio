"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FormProvider } from "react-hook-form"
import { Globe, GlobeLock } from "lucide-react"
import { AddDomainDialog } from "./add-domain-dialog"
import { Volume, VolumesManager } from "./volumes-manager"
import { ResourcesLimits } from "./resources-limits"
import { GeneralSettings } from "./general-settings"
import { Service } from "@/api/types"

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    image: z.string().min(1, "Image is required"),
    command: z.string().min(1, "Command is required"),
    resources_limit: z.boolean(),
    cpu: z.number().min(0.1).max(32),
    ram: z.number().min(0.5).max(32),
})

export const SettingsTab = ({ config, serviceId }: { config: Service['deployment']['config'], serviceId: Service['id'] }) => {
    const [volumes, setVolumes] = useState<Volume[]>([])

    const methods = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            cpu: 1,
            ram: 1,
        },
    })

    return (
        <FormProvider {...methods}>
            <form className="space-y-6 max-w-3xl mx-auto">
                <GeneralSettings defaultValues={{
                    image: config.image,
                    command: config.command
                }} serviceId={serviceId} />

                {/* Domains */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center">
                            <Globe className="mr-2 h-5 w-5 text-neutral-400" />
                            Domains
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[240px] bg-gradient-to-br from-neutral-900/50 to-neutral-800/30 rounded-lg border border-neutral-800/50 flex flex-col items-center justify-center p-6 text-center">
                            <div className="bg-neutral-800/50 p-4 rounded-full mb-4">
                                <GlobeLock size={32} strokeWidth={1.5} className="text-neutral-300" />
                            </div>
                            <h3 className="text-md font-medium mb-2">No domains configured</h3>
                            <p className="text-xs text-neutral-400 mb-4 max-w-md">
                                Add a custom domain to make your service accessible from the web
                            </p>
                            <AddDomainDialog />
                        </div>
                    </CardContent>
                </Card>

                {/* Resources */}
                <ResourcesLimits />

                <VolumesManager volumes={volumes} onVolumesChange={setVolumes} />
            </form>
        </FormProvider>
    )
}
