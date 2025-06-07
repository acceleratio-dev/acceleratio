'use client';
import {
  ArrowRightFromLine,
  Cloudy,
  Folders,
  History,
  UsersRound,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '../ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

const links = [
  {
    label: 'Projects',
    href: '/dashboard',
    icon: Folders,
  },
  {
    label: 'Servers',
    href: '/dashboard/servers',
    icon: Cloudy,
  },
  {
    label: 'Users',
    href: '/dashboard/users',
    icon: UsersRound,
  },
  {
    label: 'Changelog',
    href: '/dashboard/changelog',
    icon: History,
  },
];

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen pl-14">
      <div className="w-14 border-r fixed top-0 left-0 bottom-0 bg-white flex flex-col">
        <Link
          href="/dashboard"
          className="block transition-all m-2.5 rounded-md h-12 p-1.5"
        >
          <svg
            viewBox="0 0 83 77"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-neutral-600 stroke-neutral-600"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M73.3791 53.3301C70.4015 47.7289 68.8061 44.7278 66.7851 40.9336C66.3972 41.139 62.5211 32.798 59.7331 26.7986C58.2259 23.5551 57.0367 20.996 56.8886 20.8418C56.6601 20.6309 55.6582 18.8379 54.6386 16.8516C52.1425 12.0352 48.2578 4.86328 47.5019 3.70312C46.0078 1.4707 43.5293 0.275391 40.9453 0.591797C38.5195 0.890625 37.3593 1.91016 35.6718 5.26758C35.0039 6.60352 33.123 10.1895 31.4882 13.2656C29.7739 16.4963 28.1999 19.4627 26.7861 22.1274C22.0535 31.0474 19.115 36.5857 18.709 37.3301C18.3925 37.9102 16.1777 42.0937 13.7871 46.6465L13.6578 46.8917C11.3047 51.3558 8.81644 56.0761 8.07419 57.457C7.79431 57.9901 7.45381 58.6319 7.10343 59.2922C6.52955 60.3737 5.92919 61.5052 5.52536 62.291C4.87497 63.5391 3.8027 65.5605 3.15231 66.7734C1.25387 70.3066 0.972624 70.9746 0.902312 72.1699C0.796843 73.7344 1.34177 74.6309 2.85348 75.3691C4.24216 76.0547 5.43747 76.2832 7.63473 76.2832C10.5703 76.2832 12.4511 75.5977 14.1386 73.8926C15.0703 72.9785 15.3515 72.5039 16.3183 70.377C18.2519 66.1406 19.289 64.207 20.0097 63.5566C20.3789 63.2227 22.0488 62.1855 23.7363 61.2363C30.5039 57.4219 42.8437 50.3379 43.7226 49.7754C45.4804 48.5977 46.2539 47.1387 45.8847 45.75C45.6562 44.8887 45.0058 44.2383 43.8457 43.7109C43.0547 43.3418 41.5 43 40.5 43C38.2324 43 37.8515 43.3769 35.6367 43.9746C32.8242 44.7305 32.3672 44.7656 31.7168 44.2383C31.2773 43.8867 31.2422 43.7988 31.33 42.9199C31.4004 42.1816 31.8222 41.2324 33.2812 38.4199C37.5 30.2812 40.4355 24.8145 40.8574 24.2695C41.2265 23.8125 41.4375 23.707 41.9824 23.707C42.5273 23.707 42.7734 23.8125 43.1601 24.2871C43.9511 25.166 60.791 56.8066 66.0996 67.3711C69.2988 73.7168 69.7031 74.2793 71.7773 75.2988C73.2539 76.0371 74.4316 76.2832 76.4531 76.2832C79.8808 76.2832 82.3769 74.7187 82.5703 72.4512C82.6933 70.9043 82.6406 70.7637 77.0683 60.2695C75.6201 57.5457 74.4158 55.2803 73.3791 53.3301Z"
            />
          </svg>
        </Link>

        <div className="space-y-2 mx-2.5 mt-6">
          {links.map((link) => (
            <TooltipProvider key={link.label} delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={`block p-2 rounded-md transition-all border border-transparent group relative ${
                      pathname === link.href
                        ? 'bg-white !border-slate-300 shadow-sm'
                        : 'hover:bg-slate-300/60'
                    }`}
                  >
                    <link.icon
                      size={'auto'}
                      className="stroke-slate-700 group-hover:stroke-slate-900"
                    />
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  className="px-1.5 py-1"
                  side="right"
                  sideOffset={8}
                >
                  <p className="font-medium">{link.label}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        <div className="mt-auto mb-6 text-center border-t border-slate-300 mx-1.5 pt-3">
          <Button variant="outline" size="icon">
            <ArrowRightFromLine className="stroke-slate-700" />
          </Button>
        </div>
      </div>
      <main className="w-full h-full">{children}</main>
    </div>
  );
};
