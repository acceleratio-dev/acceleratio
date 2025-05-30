'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  ServiceType,
  useCreateServiceMutation,
} from '@/lib/mutations/createServiceMutation/_generated/createServiceMutation.generated';
import { GetProjectServicesDocument } from '@/components/project-details/tabs/project-services/_generated/getProjectServicesQuery.generated';

export const CreateDockerService = ({ projectId }: { projectId: string }) => {
  const router = useRouter();
  const [triggerMutation, { loading }] = useCreateServiceMutation({
    onError: (error) => {
      toast.error(error.message);
    },
    onCompleted: () => {
      toast.success('Service created');
      router.push(`/dashboard/projects/${projectId}`);
    },
    refetchQueries: [
      {
        query: GetProjectServicesDocument,
        variables: { projectId },
      },
    ],
  });

  const handleCreateService = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name')?.toString();
    const image = formData.get('image')?.toString();

    if (!name || !image) {
      toast.error('Please fill all fields');
      return;
    }

    triggerMutation({
      variables: {
        input: {
          name,
          projectId,
          type: ServiceType.Docker,
          config: {
            image,
            cpuLimit: null,
            memoryLimit: null,
          },
        },
      },
    });
  };

  return (
    <Card className="max-w-[600px] mx-auto">
      <CardHeader>
        <CardTitle>General info</CardTitle>
        <CardDescription>
          This is the general info of the service.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          id="create-service-form"
          onSubmit={handleCreateService}
        >
          <div>
            <Label>Service name</Label>
            <Input placeholder="my-service" name="name" />
          </div>
          <div>
            <Label>Docker image</Label>
            <Input placeholder="nginx:alpine" name="image" />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          className="flex ml-auto"
          type="submit"
          form="create-service-form"
          disabled={loading}
        >
          Create
        </Button>
      </CardFooter>
    </Card>
  );
};
