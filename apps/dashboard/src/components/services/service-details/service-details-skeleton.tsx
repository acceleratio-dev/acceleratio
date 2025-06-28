'use client';
import { Button } from '@/components/ui/button';
import { IoArrowBack } from 'react-icons/io5';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export const ServiceDetailsSkeleton = () => {
  const params = useParams();

  return (
    <div className="wrapper !mt-4 mb-20">
      <Link href={`/dashboard/project/${params.projectId}`}>
        <Button variant="ghost" className="mb-4">
          <IoArrowBack />
          Back to project
        </Button>
      </Link>
      <div className="bg-white rounded-lg border">
        <div className="p-6 flex">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
          <div className="ml-auto flex gap-2">
            <div className="h-9 bg-gray-200 rounded animate-pulse w-24"></div>
            <div className="h-9 bg-gray-200 rounded animate-pulse w-24"></div>
          </div>
        </div>
        <div className="border-t px-6 py-1 bg-gray-50 rounded-b-lg">
          <div className="flex space-x-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-7 bg-gray-200 rounded animate-pulse w-20"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
