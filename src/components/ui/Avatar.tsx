import Image from 'next/image';
import { cn } from '@/utils/cn';
import { getInitials } from '@/utils/format';

interface AvatarProps { src?: string; name: string; size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string; }

export const Avatar = ({ src, name, size = 'md', className }: AvatarProps) => {
  const sizes = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-14 w-14 text-base', xl: 'h-20 w-20 text-xl' };
  if (src) return (
    <div className={cn('rounded-full overflow-hidden flex-shrink-0 bg-brand-100', sizes[size], className)}>
      <img src={src} alt={name} className="h-full w-full object-cover" />
    </div>
  );
  return (
    <div className={cn('rounded-full flex-shrink-0 flex items-center justify-center font-semibold bg-brand-600 text-white', sizes[size], className)}>
      {getInitials(name)}
    </div>
  );
};
