import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { IconPlus } from "@tabler/icons-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { projectsApi } from "@/api/projects"
import { addProject } from "./store"
import { toast } from "sonner"
import { errorMessages } from "@/lib/error-messages"
import { useRouter } from "next/navigation"

const schema = z.object({
    name: z.string().min(1),
})

export const CreateProjectDialog = () => {
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
        },
    })

    const onSubmit = handleSubmit(async (payload) => {
        const { data } = await projectsApi.createProject(payload.name)

        if (data.success) {
            const project = data.data
            addProject(project)
            toast.success("Project created successfully")
            router.push(`/project/${project.id}`)
        } else {
            toast.error(errorMessages[data.error.code])
        }
    })

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <IconPlus />
                    Create Project
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Project</DialogTitle>
                    <DialogDescription>
                        Fill the form below to create a new project
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-6 mt-2">
                    <div className="space-y-2">
                        <Label>Project name</Label>
                        <Input placeholder="" {...register("name")} error={errors.name?.message} />
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button type="submit">
                            Create
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}