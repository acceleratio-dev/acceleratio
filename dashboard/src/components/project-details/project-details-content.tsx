'use client';
import { useSearchParams } from 'next/navigation';
import { ProjectDetailsTabs } from './project-details-tabs';
import { ProjectDetailsTabsButton } from './project-details-tabs-button';
import { Project } from '@/app/dashboard/projects/[id]/_generated/getProjectByIdQuery.generated';
import { ProjectSettings } from './tabs/project-settings';
import { ProjectServices } from './tabs/project-services';

export const ProjectDetailsContent = ({ project }: { project: Project }) => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'services';

  const renderTabContent = () => {
    switch (activeTab) {
      case 'services':
        return <ProjectServices projectId={project._id} />;
      case 'settings':
        return <ProjectSettings projectId={project._id} />;
      default:
        return <div>Services content</div>;
    }
  };
  return (
    <>
      <div className="bg-white border rounded-md">
        <div className="px-4 py-6 flex items-center gap-4">
          <svg
            version="1.1"
            baseProfile="tiny"
            width={36}
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            overflow="visible"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {' '}
              <g>
                {' '}
                <rect y="0" fill="none" width="24" height="24"></rect>{' '}
                <polygon
                  fillRule="evenodd"
                  fill="#85A4E6"
                  points="0.8,5.9 3.7,0.8 9.5,0.8 12.4,5.9 9.5,10.9 3.7,10.9 "
                ></polygon>{' '}
                <polygon
                  fillRule="evenodd"
                  fill="#5C85DE"
                  points="11.4,7.7 8.5,2.6 9.5,0.7 12.4,5.9 "
                ></polygon>{' '}
                <polygon
                  id="Shape-Copy_00000019646383529055310330000009913415011964925323_"
                  fillRule="evenodd"
                  fill="#3367D6"
                  points=" 2.7,9.3 8.5,9.3 10.5,5.9 11.4,7.7 9.5,10.9 3.7,11 "
                ></polygon>{' '}
                <polygon
                  fillRule="evenodd"
                  fill="#85A4E6"
                  points="11.2,11.9 14.2,6.8 20,6.8 22.9,11.9 20,16.9 14.2,16.9 "
                ></polygon>{' '}
                <polygon
                  id="Shape-Copy_00000133527958483064390410000012377415375428947900_"
                  fillRule="evenodd"
                  fill="#5C85DE"
                  points=" 21.9,13.7 19,8.6 20,6.7 22.9,11.9 "
                ></polygon>{' '}
                <polygon
                  id="Shape-Copy_00000176019471624316745960000001248137580190207128_"
                  fillRule="evenodd"
                  fill="#3367D6"
                  points=" 13.2,15.3 19,15.3 21,11.9 21.9,13.7 20,16.9 14.2,17 "
                ></polygon>{' '}
                <polygon
                  fillRule="evenodd"
                  fill="#85A4E6"
                  points="0.8,17.9 3.7,12.8 9.5,12.8 12.4,17.9 9.5,22.9 3.7,22.9 "
                ></polygon>{' '}
                <polygon
                  id="Shape-Copy_00000096041779745201399360000017167964797373102485_"
                  fillRule="evenodd"
                  fill="#5C85DE"
                  points=" 11.4,19.7 8.5,14.6 9.5,12.7 12.4,17.9 "
                ></polygon>{' '}
                <polygon
                  id="Shape-Copy_00000049204188488742950820000010444321201512143025_"
                  fillRule="evenodd"
                  fill="#3367D6"
                  points=" 2.7,21.3 8.5,21.3 10.5,17.9 11.4,19.7 9.5,22.9 3.7,23 "
                ></polygon>{' '}
              </g>{' '}
            </g>
          </svg>
          <div>
            <div className="text-lg font-medium leading-none">
              {project.name}
            </div>
            <div className="text-sm text-slate-600">{project.description}</div>
          </div>
        </div>
        <div className="px-4 pt-1 border-t flex justify-between items-center bg-slate-50 rounded-b-md">
          <ProjectDetailsTabs activeTab={activeTab} />
          <ProjectDetailsTabsButton
            activeTab={activeTab}
            projectId={project._id}
          />
        </div>
      </div>

      <div className="mt-4 bg-white border rounded-md overflow-hidden">
        {renderTabContent()}
      </div>
    </>
  );
};
