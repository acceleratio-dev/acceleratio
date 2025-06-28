import { useContext, useEffect, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import { PodsContext } from './pods-provider';
import { useGetPodLogsQuery } from '@/lib/graphql/generated';
import { ServiceContext } from '@/components/providers/service-provider';
import { toast } from 'sonner';

export const PodsLogs = () => {
  const { service } = useContext(ServiceContext);
  const { podName, setPodName } = useContext(PodsContext);
  const [logs, setLogs] = useState<string[]>([]);

  const { data, loading } = useGetPodLogsQuery({
    variables: {
      podName: podName || '',
      serviceId: service.id,
    },
    fetchPolicy: 'no-cache',
    skip: !podName,
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (!podName || !data?.getPodLogs) return;
    setLogs(data.getPodLogs);
  }, [podName, data?.getPodLogs]);

  return (
    <>
      <div className={`h-[${podName ? '340px' : '0px'}] transition-height duration-300`} />
      <AnimatePresence>
        {podName && (
          <motion.div
            initial={{ y: 340 }}
            animate={{ y: 0 }}
            exit={{ y: 340 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 34,
              duration: 0.3,
            }}
            className="fixed bottom-0 bg-slate-900/85 backdrop-blur-sm right-0 left-14 border border-slate-700 h-[340px] rounded-t-lg"
          >
            <button
              onClick={() => setPodName(null)}
              className="bg-white absolute -top-2.5 border cursor-pointer border-slate-300 left-1/2 -translate-x-1/2 rounded-sm px-3 shadow-sm"
            >
              <BsThreeDots size={16} />
            </button>
            <div className="text-sm border-b border-slate-500 font-medium text-slate-100 h-8 flex items-center px-2">
              Logs for pod "{podName}" <span className="text-xs text-slate-300 ml-auto">Live mode coming soon</span>
            </div>
            <div className="text-xs font-medium text-white">
              <pre className="p-2 overflow-y-auto h-[308px] logs-scrollbar w-full">
                {loading ? (
                  <code>Loading logs...</code>
                ) : (
                  <>
                    {logs.map((log, index) => (
                      <code className="block text-nowrap w-[400px]" key={log + index}>
                        {log}
                      </code>
                    ))}
                  </>
                )}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
