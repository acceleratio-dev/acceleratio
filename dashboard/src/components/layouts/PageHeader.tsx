import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '../ui/button';
import { Bell, Search } from 'lucide-react';
import { Input } from '../ui/input';

export const PageHeader = ({ title }: { title: string }) => {
  return (
    <header className="h-12 bg-white border-b flex justify-between items-center px-8">
      <div className="font-medium">{title}</div>
      <div className="relative w-[300px]">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <Input
          className="rounded-xl bg-neutral-200/50 border-0 h-8 placeholder:text-slate-500 pl-8"
          placeholder="Global search"
        />
      </div>
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell />
        </Button>
        <div className="w-[1px] h-5 bg-gray-300 ml-2 mr-4" />
        <Avatar className="w-9 h-9 border shadow-sm">
          <AvatarImage src="https://github.com/kwinston-dev.png" />
          <AvatarFallback>UO</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
