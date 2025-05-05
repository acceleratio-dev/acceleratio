import { Dialog, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Link } from "lucide-react"
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { DialogClose } from "@radix-ui/react-dialog"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
    domain: z.string().min(1),
    port: z.string().min(1),
})

export const AddDomainDialog = () => {
    const { register, handleSubmit } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            domain: "localhost"
        }
    })

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="group transition-all hover:bg-neutral-800 hover:text-white"
                >
                    <Link className="h-4 w-4 mr-2 group-hover:text-white" />
                    Add domain
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Assign Domain</DialogTitle>
                    <DialogDescription>
                        Specify the domain and port to expose your service to public.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                    <div className="flex">
                        <div className="w-1/4">
                            <Input value="https://" className="rounded-r-none" readOnly disabled />
                        </div>
                        <Input className="rounded-l-none rounded-r-none" placeholder="example.com" {...register("domain")} />
                        <div className="w-1/4">
                            <Input className="rounded-l-none" placeholder="Port" {...register("port")} />
                        </div>
                    </div>
                    <div className="text-sm text-neutral-400">
                        Add A domain record "127.0.0.1" to your DNS to point to your service.
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button size="sm" variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button size="sm">
                        Assign
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}