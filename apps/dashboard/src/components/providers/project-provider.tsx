import { GetProjectByIdQuery } from '@/lib/graphql/generated';
import { createContext } from 'react';

export const ProjectContext = createContext<ProviderContext>({} as ProviderContext);

interface ProviderContext {
  project: GetProjectByIdQuery['project'];
}

export const ProjectProvider = ({
  children,
  project,
}: {
  children: React.ReactNode;
  project: GetProjectByIdQuery['project'];
}) => {
  return <ProjectContext.Provider value={{ project }}>{children}</ProjectContext.Provider>;
};
