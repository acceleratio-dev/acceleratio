'use client'

import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { ProjectDetailsTabs } from "@/components/project-details/project-details-tabs";
import { ProjectDetailsTabsButton } from "@/components/project-details/project-details-tabs-button";
import { useSearchParams } from "next/navigation";


export default function ProjectPage() {
    const searchParams = useSearchParams()
    const activeTab = searchParams.get('tab') || 'services'

    const renderTabContent = () => {
        switch (activeTab) {
            case 'services':
                return <div>Services content</div>
            case 'environments':
                return <div>Variables content</div>
            case 'deployments':
                return <div>Deployments history content</div>
            case 'settings':
                return <div>Settings content</div>
            default:
                return <div>Services content</div>
        }
    }

    return (
        <DashboardLayout>
            <div className="wrapper">
                <div className="bg-white border rounded-md">
                    <div className="px-4 py-6">
                        Title
                    </div>
                    <div className="px-4 pt-1 border-t flex justify-between items-center">
                        <ProjectDetailsTabs activeTab={activeTab} />
                        <ProjectDetailsTabsButton activeTab={activeTab} />
                    </div>
                </div>

                <div className="mt-2 bg-white border rounded-md min-h-[600px] p-4">
                    {renderTabContent()}
                </div>
            </div>
        </DashboardLayout>
    )
}