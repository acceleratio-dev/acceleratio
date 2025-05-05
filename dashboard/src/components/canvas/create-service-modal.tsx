"use client"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Plus } from "lucide-react"
import { DialogClose, DialogDescription, DialogTitle } from "@radix-ui/react-dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { DialogFooter } from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useUnit } from "effector-react"
import { $canvas } from "@/app/project/[id]/store"
import { servicesApi } from "@/api/services"
import { toast } from "sonner"
import { useState } from "react"

const schema = z.object({
    name: z.string().min(1),
    image: z.string().min(1),
})

export const CreateServiceModal = () => {
    const { project_id } = useUnit($canvas)
    const [open, setOpen] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    })

    const onSubmit = async (payload: z.infer<typeof schema>) => {
        const { data } = await servicesApi.create({
            name: payload.name,
            image: payload.image,
            projectId: project_id || ""
        })

        if (data.success) {
            toast.success("Service created successfully")
            setOpen(false)
        } else {
            toast.error(data.error.message)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Plus />
                    Create Service
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Service</DialogTitle>
                    <DialogDescription className="text-sm text-neutral-400">
                        Fill the form below to create a new service.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-6 mb-8 mt-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input placeholder="My Service" {...register("name")} error={errors.name?.message} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="image">Image</Label>
                            <Input placeholder="nginx:latest" {...register("image")} error={errors.image?.message} />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Create</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}