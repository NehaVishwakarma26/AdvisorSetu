import { cn } from '@/utils/cn';

interface CardProps { children: React.ReactNode; className?: string; hover?: boolean; onClick?: () => void; }

export const Card = ({ children, className, hover, onClick }: CardProps) => (
  <div onClick={onClick} className={cn('bg-white rounded-xl border border-slate-200 shadow-sm', hover && 'hover:shadow-md hover:border-brand-200 transition-all duration-200 cursor-pointer', className)}>
    {children}
  </div>
);

export const CardHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('px-6 py-4 border-b border-slate-100', className)}>{children}</div>
);

export const CardBody = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('px-6 py-4', className)}>{children}</div>
);
