import { ProjectContext } from '@/components/providers/project-provider';
import { useGetServicesByProjectIdQuery } from '@/lib/graphql/generated';
import { toast } from 'sonner';
import { useContext } from 'react';
import Link from 'next/link';

export const ProjectServicesList = () => {
  const { project } = useContext(ProjectContext);
  const { data } = useGetServicesByProjectIdQuery({
    variables: {
      projectId: project.id,
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div className="mt-4 bg-white rounded-lg shadow-sm border divide-y pb-2">
      <div className="h-8 bg-gray-100 rounded-t-lg px-4 flex items-center text-xs font-medium">
        <div>Name</div>
      </div>
      {data?.services.map((service) => (
        <Link
          key={service.id}
          href={`/dashboard/project/${project.id}/service/${service.id}`}
          className="h-12 flex items-center px-4 hover:bg-slate-50"
        >
          {service.name}
        </Link>
      ))}
      <div />
    </div>
  );
};
