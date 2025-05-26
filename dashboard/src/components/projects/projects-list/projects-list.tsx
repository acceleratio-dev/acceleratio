'use client';
import { Globe, Server, UserRound } from 'lucide-react';

import Link from 'next/link';
import {
  GetProjectsQuery,
  useGetProjectsQuery,
} from './_generated/getProjectsQuery.generated';
import { CreateProject } from '../create-project';

export const ProjectsList = () => {
  const { data, loading, refetch } = useGetProjectsQuery();

  return (
    <>
      {loading && <div>Loading...</div>}
      {data?.getProjects.map((project) => (
        <ProjectItem key={project._id} project={project} />
      ))}
      <CreateProject refetch={refetch} />
    </>
  );
};

const ProjectItem = ({
  project,
}: {
  project: GetProjectsQuery['getProjects'][number];
}) => {
  return (
    <Link
      href={`/dashboard/projects/${project._id}`}
      className="block hover:bg-slate-50 transition-all bg-white w-[340px] border rounded-md shadow-sm p-3.5 relative"
    >
      <div className="absolute top-3 right-3 bg-emerald-600 text-white px-2 font-medium py-1 rounded-md text-xs">
        Running
      </div>
      <div className="font-medium">{project.name}</div>
      <div className="text-sm text-gray-500 h-10">{project.description}</div>
      <div className="text-sm font-medium flex justify-between">
        <div className="flex items-center gap-1">
          <UserRound size={14} className="stroke-slate-700" />1 User
        </div>
        <div className="flex items-center gap-1">
          <Server size={14} className="stroke-slate-700" />
          12 environments
        </div>
        <div className="flex items-center gap-1">
          <Globe size={14} className="stroke-slate-700" />3 domains
        </div>
      </div>
    </Link>
  );
};
