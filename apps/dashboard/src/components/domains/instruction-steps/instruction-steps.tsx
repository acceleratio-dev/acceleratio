'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Copy, Globe, Settings, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { RefreshDomainStatuses } from '../refresh-domain-statuses';
import { useGetLoadBalancerIpQuery } from '@/lib/graphql/generated';

export const InstructionSteps = () => {
  const { data } = useGetLoadBalancerIpQuery({
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const steps = [
    {
      id: 1,
      title: 'Access your domain provider',
      description: 'Log in to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.)',
      icon: <Globe className="size-4" />,
    },
    {
      id: 2,
      title: 'Navigate to DNS settings',
      description: "Find the DNS management or DNS records section in your provider's dashboard",
      icon: <Settings className="size-4" />,
    },
    {
      id: 3,
      title: 'Add A record',
      description: 'Create a new A record with the IP address provided below',
      code: data?.ip,
      icon: <Copy className="size-4" />,
    },
    {
      id: 4,
      title: 'Wait for propagation',
      description: 'DNS changes can take up to 48 hours to propagate worldwide',
      icon: <AlertCircle className="size-4" />,
      note: 'Usually takes 5-15 minutes',
    },
    {
      id: 5,
      title: 'Refresh domains status',
      description: 'Click the refresh button below to update the domains status',
      icon: <CheckCircle className="h-5 w-5" />,
    },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>Instructions</CardTitle>
        <CardDescription>Follow these steps to verify your domain.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {steps.map((step, index) => (
            <div key={step.id} className="relative flex gap-4 pb-4 last:pb-0">
              {index < steps.length - 1 && (
                <div className="absolute left-4 top-8 w-px h-full bg-gray-200 -translate-x-px" />
              )}

              <div className="relative z-10 flex-shrink-0">
                <div
                  className={`
                    w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold
                    bg-slate-50 text-slate-700 border-2 border-slate-200
                  `}
                >
                  {step.id}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-slate-500">{step.icon}</div>
                  <h3 className="font-semibold text-sm text-slate-900">{step.title}</h3>
                </div>

                <p className="text-gray-600 mb-3 text-sm">{step.description}</p>

                {step.code && (
                  <div className="bg-gray-50 border rounded-lg px-3 py-1 mb-3">
                    <div className="flex items-center justify-between">
                      <code className="text-sm font-mono text-gray-800 break-all">{step.code}</code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          copyToClipboard(step.code!);
                          toast.info('Copied to clipboard');
                        }}
                        className="ml-2 flex-shrink-0"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {step.note && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="size-4 text-amber-600" />
                      <span className="text-sm text-amber-800">{step.note}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <CardFooter className="mt-2">
          <RefreshDomainStatuses />
        </CardFooter>
      </CardContent>
    </Card>
  );
};
