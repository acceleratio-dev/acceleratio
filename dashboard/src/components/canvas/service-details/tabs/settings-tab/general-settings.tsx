import { Input } from "@/components/ui/input"
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageIcon, Save, Server, Terminal, Loader2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { Service } from "@/api/types"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { updateServiceConfigFx } from "@/app/project/[id]/store"


type Form = Pick<Service['deployment']['config'], 'image' | 'command'>

const schema = z.object({
    image: z.string().min(1, "Image is required"),
    command: z.string().optional()
})

export const GeneralSettings = ({ defaultValues, serviceId }: { defaultValues: Form, serviceId: Service['id'] }) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isSubmitting },
        reset
    } = useForm<Form>({
        defaultValues,
        resolver: zodResolver(schema)
    })

    useEffect(() => {
        reset({
            image: defaultValues?.image,
            command: defaultValues?.command
        })
    }, [defaultValues, reset])

    const onSubmit = handleSubmit(async (data) => {
        try {
            await updateServiceConfigFx({ serviceId, data })
            reset(data)
        } catch (error) {
            toast.error("Failed to update settings")
            console.error(error)
        }
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl flex items-center">
                    <Server className="mr-2 h-5 w-5 text-neutral-400" />
                    General Settings
                </CardTitle>
                <CardAction>
                    {
                        isDirty && (
                            <Button size="sm" disabled={isSubmitting} onClick={onSubmit}>
                                {isSubmitting ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Save className="h-4 w-4" />
                                )}
                                <span className="ml-2">Save changes</span>
                            </Button>
                        )
                    }
                </CardAction>
            </CardHeader>
            <CardContent className="space-y-4">
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
                            {...register("image")}
                        />
                    </div>
                    {errors.image && <p className="text-xs text-red-500 mt-1">{errors.image.message}</p>}
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
                            {...register("command")}
                        />
                    </div>
                    {errors.command && <p className="text-xs text-red-500 mt-1">{errors.command.message}</p>}
                </div>
            </CardContent>
        </Card>
    )
}