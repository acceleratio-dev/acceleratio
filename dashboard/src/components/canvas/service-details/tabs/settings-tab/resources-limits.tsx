import { useFormContext } from "react-hook-form"
import { Cpu, MemoryStickIcon as Memory, Infinity } from "lucide-react"

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

export const ResourcesLimits = () => {
    const { watch, setValue, register } = useFormContext()
    const resourcesLimit = watch("resources_limit")
    const cpuValue = watch("cpu")
    const ramValue = watch("ram")
    const cpuUnlimited = watch("cpu_unlimited", true)
    const ramUnlimited = watch("ram_unlimited", true)

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl flex items-center">
                    <Cpu className="mr-2 h-5 w-5 text-neutral-400" />
                    Resource Limits
                </CardTitle>
                <CardAction>
                    <div className="flex items-center justify-between gap-2">
                        <Label htmlFor="resources_limit">{resourcesLimit ? "Enabled" : "Disabled"}</Label>
                        <Switch id="resources_limit" checked={resourcesLimit} onCheckedChange={() => setValue("resources_limit", !resourcesLimit)} />
                    </div>
                </CardAction>
            </CardHeader>
            <CardContent>
                {resourcesLimit && (
                    <div className="space-y-6">
                        {/* CPU */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium flex items-center">
                                    <Cpu className="mr-2 h-4 w-4 text-neutral-400" />
                                    CPU Allocation
                                </Label>
                                <div className="flex items-center gap-2 h-6">
                                    <span className="text-xl font-semibold">
                                        {cpuUnlimited ? (
                                            <span className="flex items-center">
                                                <Infinity className="h-5 w-5" />
                                                <span className="text-sm text-neutral-400 ml-1">cores</span>
                                            </span>
                                        ) : (
                                            <>
                                                {cpuValue} <span className="text-sm text-neutral-400">cores</span>
                                            </>
                                        )}
                                    </span>
                                    <Switch
                                        checked={cpuUnlimited}
                                        onCheckedChange={(checked) => {
                                            setValue("cpu_unlimited", checked)
                                            if (!checked) setValue("cpu", 1)
                                        }}
                                    />
                                </div>
                            </div>

                            {!cpuUnlimited && (
                                <div className="pt-2">
                                    <Slider
                                        value={[cpuValue]}
                                        min={0.1}
                                        max={32}
                                        step={0.1}
                                        onValueChange={(value) => setValue("cpu", value[0])}
                                        className="my-4"
                                    />
                                    <div className="flex justify-between text-xs text-neutral-500">
                                        <span>0.1</span>
                                        <span>16</span>
                                        <span>32</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* RAM */}
                        <div className="space-y-4 pt-2">
                            <div className="flex items-center justify-between">
                                <Label className="text-sm font-medium flex items-center">
                                    <Memory className="mr-2 h-4 w-4 text-neutral-400" />
                                    Memory Allocation
                                </Label>
                                <div className="flex items-center gap-2 h-6">
                                    <span className="text-xl font-semibold">
                                        {ramUnlimited ? (
                                            <span className="flex items-center">
                                                <Infinity className="h-5 w-5" />
                                                <span className="text-sm text-neutral-400 ml-1">GB</span>
                                            </span>
                                        ) : (
                                            <>
                                                {ramValue} <span className="text-sm text-neutral-400">GB</span>
                                            </>
                                        )}
                                    </span>
                                    <Switch
                                        checked={ramUnlimited}
                                        onCheckedChange={(checked) => {
                                            setValue("ram_unlimited", checked)
                                            if (!checked) setValue("ram", 1)
                                        }}
                                    />
                                </div>
                            </div>

                            {!ramUnlimited && (
                                <div className="pt-2">
                                    <Slider
                                        value={[ramValue]}
                                        min={0.5}
                                        max={32}
                                        step={0.5}
                                        onValueChange={(value) => setValue("ram", value[0])}
                                        className="my-4"
                                    />
                                    <div className="flex justify-between text-xs text-neutral-500">
                                        <span>0.5</span>
                                        <span>16</span>
                                        <span>32</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
} 