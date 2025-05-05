import { projectsApi } from '@/api/projects';
import { ProjectCanvas } from '@/components/canvas';
import { CanvasHeader } from '@/components/canvas/header';
import { ServiceDetails } from '@/components/canvas/service-details';
import { notFound } from 'next/navigation';


export default async function ProjectPage({ params }: { params: { id: string } }) {
    const { id } = await params
    const { data } = await projectsApi.getProjectById(id)

    if (!data.success) {
        return notFound()
    }

    return (
        <div className='relative h-screen w-screen overflow-hidden'>
            <CanvasHeader name={data.data.name} />
            <div className="flex w-full h-full">
                <ProjectCanvas projectId={id} />
                <ServiceDetails />
            </div>
        </div>
    )
}