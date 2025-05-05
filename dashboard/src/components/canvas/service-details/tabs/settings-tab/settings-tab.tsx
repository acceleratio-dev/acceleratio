"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FormProvider } from "react-hook-form"
import { updateServiceFx } from "@/app/project/[id]/store"
import { Globe, GlobeLock, Cpu, Server, ImageIcon, Terminal, Save } from "lucide-react"
import { toast } from "sonner"
import { AddDomainDialog } from "./add-domain-dialog"
import { Volume, VolumesManager } from "./volumes-manager"
import { ResourcesLimits } from "./resources-limits"

const schema = z.object({
    name: z.string().min(1, "Name is required"),
    image: z.string().min(1, "Image is required"),
    command: z.string().min(1, "Command is required"),
    resources_limit: z.boolean(),
    cpu: z.number().min(0.1).max(32),
    ram: z.number().min(0.5).max(32),
})

export const SettingsTab = ({ service_id }: { service_id: string }) => {
    const [saving, setSaving] = useState(false)
    const [volumes, setVolumes] = useState<Volume[]>([])
    
    const methods = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            cpu: 1,
            ram: 1,
        },
    })

    const onSubmit = async (data: z.infer<typeof schema>) => {
        setSaving(true)
        try {
            await updateServiceFx({
                id: service_id,
                name: data.name,
                image: data.image,
                cpu: data.cpu,
                ram: data.ram.toString(),
            })
            toast.success("Settings updated", {
                description: "Your service settings have been saved successfully.",
            })
        } catch (error) {
            toast.error("Failed to update service settings.", {
                description: "Please try again.",
            })
        } finally {
            setSaving(false)
        }
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6 max-w-3xl mx-auto">
                {/* General Settings */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl flex items-center">
                            <Server className="mr-2 h-5 w-5 text-neutral-400" />
                            General Settings
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium">
                                Service Name
                            </Label>
                            <Input id="name" className="transition-all focus-visible:ring-offset-2" {...methods.register("name")} />
                            {methods.formState.errors.name && <p className="text-xs text-red-500 mt-1">{methods.formState.errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="image" className="text-sm font-medium">
                                Docker Image
                            </Label>
                            <div className="relative">
                                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                                <Input
                                    id="image"
                                    placeholder="nginx:latest"
                                    className="pl-10 transition-all focus-visible:ring-offset-2"
                                    {...methods.register("image")}
                                />
                            </div>
                            {methods.formState.errors.image && <p className="text-xs text-red-500 mt-1">{methods.formState.errors.image.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="command" className="text-sm font-medium">
                                Startup Command
                            </Label>
                            <div className="relative">
                                <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                                <Input
                                    id="command"
                                    placeholder="Example: nginx -g 'daemon off;'"
                                    className="pl-10 transition-all focus-visible:ring-offset-2"
                                    {...methods.register("command")}
                                />
                            </div>
                            {methods.formState.errors.command && <p className="text-xs text-red-500 mt-1">{methods.formState.errors.command.message}</p>}
                        </div>
                    </CardContent>
                </Card>

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

                {/* Save Button */}
                <Button type="submit" className="w-full transition-all relative overflow-hidden group" disabled={saving}>
                    <span className="flex items-center justify-center gap-2">
                        <Save className={`h-4 w-4 ${saving ? "animate-spin" : "group-hover:animate-pulse"}`} />
                        {saving ? "Saving changes..." : "Save changes"}
                    </span>
                </Button>
            </form>
        </FormProvider>
    )
}
