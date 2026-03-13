import { LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

interface StatCardProps { label: string; value: string | number; icon: LucideIcon; change?: string; positive?: boolean; color?: 'brand' | 'emerald' | 'amber' | 'purple'; }

export const StatCard = ({ label, value, icon: Icon, change, positive, color = 'brand' }: StatCardProps) => {
  const colors = {
    brand: 'bg-brand-50 text-brand-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
    purple: 'bg-purple-50 text-purple-600',
  };
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          {change && <p className={cn('text-xs mt-1 font-medium', positive ? 'text-emerald-600' : 'text-red-500')}>{positive ? '↑' : '↓'} {change} vs last month</p>}
        </div>
        <div className={cn('h-10 w-10 rounded-xl flex items-center justify-center', colors[color])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};
