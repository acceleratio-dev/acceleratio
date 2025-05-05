import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Link } from "lucide-react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { IconPencil } from "@tabler/icons-react"

const members = [
    {
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Admin",
    },
    {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        role: "Member",
    },
    {
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Member",
    },
]

export default function TeamPage() {
    return (
        <main className="mx-8 my-4">
            <PageHeader title="Team" description="Manage your team members.">
                <Button>
                    <Link />
                    Add Team Member
                </Button>
            </PageHeader>
            <div className="mt-4 bg-neutral-800/70 rounded-md p-4 border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {members.map((member, i) => (
                            <TableRow key={i}>
                                <TableCell>{member.name}</TableCell>
                                <TableCell>{member.email}</TableCell>
                                <TableCell>{member.role}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="outline" size="sm">
                                        <IconPencil />
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </main>
    )
}
