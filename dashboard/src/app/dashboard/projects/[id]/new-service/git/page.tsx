"use client"

import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const tabs = [
    'Provider',
    'Limits',
    'Ports',
    'Variables',
    'Submit'
]

export default function GitPage() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <DashboardLayout>
            <div className="wrapper max-w-[800px] !mx-auto !mt-8">
                <div className="title-wrapper !justify-normal">
                    <Button size="icon" variant="ghost" className="w-8 h-8 mr-2">
                        <ArrowLeft />
                    </Button>
                    <div className="title">
                        Create new git service
                    </div>
                </div>
                <div className="border rounded-md">
                    <div className="px-4 pt-0.5 border-b bg-slate-50 flex items-center gap-1 text-sm font-medium rounded-t-md">
                        {
                            tabs.map((tab, i) => (
                                <button
                                    onClick={() => setActiveTab(i)}
                                    className={`border-b-2 py-2 px-4 flex items-center gap-2 transition-colors duration-200 hover:bg-slate-100 ${
                                        activeTab === i 
                                            ? 'border-primary text-primary' 
                                            : 'border-transparent text-slate-600'
                                    }`}
                                    key={tab}
                                >
                                    <div className={`text-[10px] rounded-full w-4 h-4 flex items-center justify-center transition-colors duration-200 ${
                                        activeTab === i 
                                            ? 'bg-primary text-white' 
                                            : 'bg-slate-200 text-slate-600'
                                    }`}>
                                        {i + 1}
                                    </div>
                                    <span>{tab}</span>
                                </button>
                            ))
                        }
                    </div>
                    <div className="p-6">
                        {/* Tab content will go here */}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}