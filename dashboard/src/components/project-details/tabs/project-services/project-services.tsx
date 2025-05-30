import { toast } from 'sonner';
import { ServiceItem } from './service-item';
import { useGetProjectServicesQuery } from './_generated/getProjectServicesQuery.generated';

export const ProjectServices = ({ projectId }: { projectId: string }) => {
  const { data, loading, error } = useGetProjectServicesQuery({
    variables: { projectId },
  });

  if (error) {
    toast.error(error.message);
    return;
  }

  if (loading) return <div>Loading...</div>;
  console.log(data);

  return (
    <div>
      <div className="flex items-center font-medium bg-slate-50 border-b h-10 text-sm px-4 gap-4">
        <div className="flex w-1/2 border-r h-10 items-center">
          <div>Service</div>
        </div>
        <div className="flex w-1/2 items-center">
          <div className="w-40">Status</div>
          <div>Provider</div>
          <div className="text-right ml-auto">Last deployment</div>
        </div>
      </div>
      {data?.services?.map((service) => (
        <ServiceItem key={service._id} service={service} />
      ))}
    </div>
  );
};

// const useServiceStatusUpdates = (projectId: string) => {
//   const client = useApolloClient();

//   useServiceStatusUpdatedSubscription({
//     variables: { projectId },
//     onError: (error) => toast.error(error.message),
//     onData: ({ data: { data } }) => {
//       if (!data?.serviceStatusUpdated) return;

//       const { serviceId, status } = data.serviceStatusUpdated;
//       client.cache.modify({
//         id: client.cache.identify({ __typename: 'Service', _id: serviceId }),
//         fields: { status: () => status },
//       });
//     },
//   });
// };
