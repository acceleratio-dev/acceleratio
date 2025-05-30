'use client';
import { ServiceWithDeployment } from '@/app/dashboard/service/[id]/_generated/getServiceByIdQuery.generated';
import { ServiceDetailsTabs } from './service-details-tabs';
import { ServiceStatusBadge } from '../service/service-status-badge';
import { ServiceActions } from './service-actions/service-actions';

export const ServiceDetailsHeader = ({
  service,
  activeTab,
}: {
  service: ServiceWithDeployment;
  activeTab: string;
}) => {
  const { activeDeployment, draftDeployment } = service;
  const deployment = activeDeployment || draftDeployment;
  return (
    <div>
      <div className="border rounded-md">
        <div className="px-4 py-6 flex items-center gap-4">
          <svg
            viewBox="0 0 24 24"
            id="Artwork"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            width={36}
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <polygon
                points="11.19 11.35 15.75 3.51 6.75 3.51 2.25 11.35 11.19 11.35"
                style={{
                  fill: '#aecbfa',
                }}
              ></polygon>
              <polygon
                points="2.25 12.65 6.74 20.49 15.73 20.49 11.25 12.65 2.25 12.65"
                style={{
                  fill: '#4285f4',
                }}
              ></polygon>
              <path
                d="M21.75,12l-4.5-7.87L12.74,12l4.51,7.87Z"
                style={{
                  fill: '#669df6',
                }}
              ></path>
            </g>
          </svg>
          <div className="flex items-center gap-2">
            <div className="text-lg font-medium leading-none">
              {service.name}
            </div>
          </div>
          <div className='ml-auto'>
            <ServiceActions service={service} />
          </div>
        </div>
        <div className="px-4 pt-1 border-t flex justify-between items-center bg-slate-50 rounded-b-md">
          <ServiceDetailsTabs activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
};
