'use client';
import { GetProjectsQuery, useGetProjectsQuery } from '@/lib/graphql/generated';
import { CreateProjectDialog } from './create-project-dialog';
import { GoContainer } from 'react-icons/go';
import { toast } from 'sonner';
import Link from 'next/link';

export const ProjectsList = () => {
  const { data, loading, error } = useGetProjectsQuery({
    onError: (error) => {
      toast.error(error.message);
    },
  });

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-4 gap-4">
      {data?.projects.map((project) => (
        <ProjectItem key={project.id} {...project} />
      ))}

      <CreateProjectDialog />
    </div>
  );
};

const ProjectItem = (project: GetProjectsQuery['projects'][number]) => {
  return (
    <Link href={`/dashboard/project/${project.id}`} className="border bg-white flex-1/4 w-full rounded-lg shadow-sm p-4 hover:bg-gray-50">
      <div className="font-medium">{project.name}</div>
      <div className="text-sm text-gray-500 my-2 h-9">{project.description || 'No description'}</div>
      <div className="text-sm text-slate-700 font-medium flex items-center gap-2">
        <GoContainer />
        12 services
      </div>
    </Link>
  );
};
