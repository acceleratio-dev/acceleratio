import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageIcon, Server, Terminal } from "lucide-react"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"

interface Form {
    image: string
    command: string
}

export const GeneralSettings = ({ defaultValues }: { defaultValues: Form }) => {
    const {
        register,
        formState: { errors }
    } = useForm<Form>({
        defaultValues
    })

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl flex items-center">
                    <Server className="mr-2 h-5 w-5 text-neutral-400" />
                    General Settings
                </CardTitle>
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