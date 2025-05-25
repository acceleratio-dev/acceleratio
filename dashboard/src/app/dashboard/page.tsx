import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Globe, Server, UserRound } from "lucide-react";
import Link from "next/link";

export default function DashboardIndex() {

    return (
        <DashboardLayout>
            <div className="wrapper">
                <div className="title-wrapper">
                    <h1 className="title">Projects list</h1>
                    <Button>
                        New project
                    </Button>
                </div>

                <div className="flex">
                    <Link href="/dashboard/projects/1" className="block hover:bg-slate-50 transition-all bg-white w-[340px] border rounded-md shadow-sm p-3 relative">
                        <div className="absolute top-2 right-2 bg-emerald-600 text-white px-2 font-medium py-1 rounded-md text-xs">
                            Online
                        </div>
                        <div className="font-medium">Project title</div>
                        <div className="text-sm text-gray-500 h-10">
                            Project description
                        </div>
                        <div className="text-sm font-medium flex justify-between">
                            <div className="flex items-center gap-1">
                                <UserRound size={14} className="stroke-slate-700" />
                                1 User
                            </div>
                            <div className="flex items-center gap-1">
                                <Server size={14} className="stroke-slate-700" />   
                                12 environments
                            </div>
                            <div className="flex items-center gap-1">
                                <Globe size={14} className="stroke-slate-700" />
                                3 domains
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    )
}