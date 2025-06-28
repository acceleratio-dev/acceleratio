import { ServiceContext } from '@/components/providers/service-provider';
import { Button } from '@/components/ui/button';
import {
  EnvironmentVariableScope,
  useDeleteEnvironmentVariableMutation,
  useGetServiceEnvironmentVariablesQuery,
} from '@/lib/graphql/generated';
import moment from 'moment';
import { useContext, useState } from 'react';
import { BiSolidCopy } from 'react-icons/bi';
import { BsBoxFill, BsStack } from 'react-icons/bs';
import { FaKey } from 'react-icons/fa6';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { MdDelete, MdEdit } from 'react-icons/md';
import { RiSettings3Line } from 'react-icons/ri';
import { toast } from 'sonner';

export const Environment = () => {
  const { service } = useContext(ServiceContext);
  const { data } = useGetServiceEnvironmentVariablesQuery({
    variables: {
      serviceId: service.id,
    },
  });
  const [deleteVariable, { loading }] = useDeleteEnvironmentVariableMutation({
    onError: (error) => {
      toast.error(error.message);
    },
    onCompleted: () => {
      toast.success('Environment variable deleted');
    },
    refetchQueries: ['GetServiceEnvironmentVariables'],
  });

  if (!data?.variables || data.variables.length === 0) {
    return (
      <div className="mt-4 bg-white border rounded-lg p-12">
        <div className="text-center">
          <FaKey className="mx-auto h-12 w-12 text-slate-600 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">No environment variables</h3>
          <p className="text-slate-600 mb-4">Environment variables haven't been configured for this service yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 bg-white border rounded-lg divide-y">
      <div className="grid grid-cols-3 px-4 divide-x h-8 bg-slate-50 rounded-t-lg text-xs font-medium text-slate-600">
        <div className="leading-8">Name</div>
        <div className="pl-4 col-span-2 leading-8 grid grid-cols-4">
          <div className="col-span-2">Value</div>
          <div>Scope</div>
          <div className="text-right">Last updated</div>
        </div>
      </div>
      {data?.variables.map((variable) => (
        <div className="grid grid-cols-3 px-4 divide-x h-12 items-center text-sm group" key={variable.id}>
          <div className="leading-12 flex items-center justify-between pr-4">
            <div>{variable.name}</div>
            <div className="text-slate-700 flex gap-2">
              <Button size="icon" variant="outline" loading={loading}>
                <MdEdit />
              </Button>
              <Button
                size="icon"
                variant="outline"
                loading={loading}
                onClick={() => deleteVariable({ variables: { id: variable.id } })}
              >
                <MdDelete />
              </Button>
            </div>
          </div>
          <div className="grid col-span-2 grid-cols-4 pl-4">
            <div className="col-span-2">
              <EnvironmentValue value={variable.value} />
            </div>
            <div>
              <EnvironmentScope scope={variable.scope} />
            </div>
            <div className="text-right">{moment(variable.updatedAt).format('DD MMM YYYY  HH:mm:ss')}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const EnvironmentScope = ({ scope }: { scope: EnvironmentVariableScope }) => {
  const icons: Record<EnvironmentVariableScope, React.ReactNode> = {
    [EnvironmentVariableScope.Service]: <BsBoxFill />,
    [EnvironmentVariableScope.Project]: <BsStack />,
  };

  return (
    <div className="capitalize bg-slate-100 text-slate-700 text-xs inline-flex items-center gap-1.5 px-2 font-medium py-0.5 border rounded-sm">
      {icons[scope]}
      {scope.toLowerCase()}
    </div>
  );
};

const EnvironmentValue = ({ value }: { value: string }) => {
  const [showValue, setShowValue] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    toast.success('Copied to clipboard');
  };

  return (
    <div className="col-span-2 flex items-center gap-4">
      <div className="w-2/5">{showValue ? value : '*****************'}</div>
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button size="icon" variant="ghost" onClick={handleCopy}>
          <BiSolidCopy />
        </Button>
        <Button size="icon" variant="ghost" onClick={() => setShowValue(!showValue)}>
          {showValue ? <HiEyeOff /> : <HiEye />}
        </Button>
      </div>
    </div>
  );
};
