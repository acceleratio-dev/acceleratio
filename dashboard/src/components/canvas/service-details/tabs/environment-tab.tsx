import { Button } from "@/components/ui/button"
import { File, List, Plus, Save, Trash, Variable } from "lucide-react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const schema = z.object({
    variables: z.array(z.object({
        key: z.string(),
        value: z.string(),
    })),
})

export const EnvironmentTab = ({ service_id }: { service_id: string }) => {
    const { register, handleSubmit, setValue, watch, formState: { isDirty } } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            variables: [],
        },
    })

    const variables = watch("variables")

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                    <Variable className="h-5 w-5 text-neutral-400" />
                    Environment Variables
                </CardTitle>
                <CardDescription>
                    Add environment variables to the service.
                </CardDescription>
                <CardAction>
                    <Button variant="outline" onClick={() => setValue("variables", [...variables, { key: "", value: "" }])}>
                        <Plus />
                        Add variable
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent className="space-y-4 mt-2">
                {
                    variables.length > 0 ? (
                        variables.map((_, index) => (
                            <div className="flex " key={index}>
                                <div className="min-w-2/5">
                                    <Input className="rounded-r-none !bg-neutral-800" placeholder="NAME" {...register(`variables.${index}.key`)} />
                                </div>
                                <Input className="rounded-l-none !bg-neutral-800/70" placeholder="VALUE" {...register(`variables.${index}.value`)} />
                                <Button className="ml-2" variant="destructive" onClick={() => setValue("variables", variables.filter((_, i) => i !== index))}>
                                    <Trash />
                                </Button>
                            </div>
                        ))
                    ) : <EmptyState />
                }

                {
                    isDirty && (
                        <Button className="w-full mt-4" size="sm">
                            <Save />
                            Save changes
                        </Button>
                    )
                }
            </CardContent>
        </Card>
    )
}

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-full">
        <div className="text-sm text-muted-foreground">
            No environment variables added yet.
        </div>
    </div>
)