import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


export default function ServersPage() {
    return (
        <DashboardLayout>
            <div className="wrapper">
                <div className="title-wrapper">
                    <h1 className="title">Servers</h1>
                    <Button>
                        <Plus />
                        Add Server
                    </Button>
                </div>

                <div className="bg-white rounded-md shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Server</TableHead>
                                <TableHead>IP</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Installation Completed</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow className="h-12">
                                <TableCell className="font-medium">Server name</TableCell>
                                <TableCell>0.0.0.0</TableCell>
                                <TableCell>Running</TableCell>
                                <TableCell>Yes</TableCell>
                                <TableCell>2025-01-01 12:00:00</TableCell>
                                <TableCell>
                                    <Button size="icon" variant="outline">
                                        <MoreHorizontal />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>

            </div>
        </DashboardLayout>
    )
}