import { DomainStatus as DomainStatusEnum } from '@/lib/graphql/generated';
import { cn } from '@/lib/utils';

const statusMap = {
  [DomainStatusEnum.Active]: 'Active',
  [DomainStatusEnum.Pending]: 'DNS Verification',
};

const statusColors = {
  [DomainStatusEnum.Active]: 'bg-emerald-50 text-emerald-500',
  [DomainStatusEnum.Pending]: 'bg-blue-50 text-blue-500',
};

export const DomainStatus = ({ status }: { status: DomainStatusEnum }) => {
  return <div className={cn('inline-block text-xs font-medium px-2 py-0.5 rounded-sm', statusColors[status])}>{statusMap[status]}</div>;
};
