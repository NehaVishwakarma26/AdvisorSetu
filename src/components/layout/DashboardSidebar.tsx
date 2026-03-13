'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import { LucideIcon } from 'lucide-react';

interface NavItem { href: string; label: string; icon: LucideIcon; badge?: number; }

interface DashboardSidebarProps { title: string; items: NavItem[]; }

export const DashboardSidebar = ({ title, items }: DashboardSidebarProps) => {
  const pathname = usePathname();
  return (
    <aside className="w-64 flex-shrink-0 hidden lg:block">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden sticky top-24">
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
        </div>
        <nav className="p-2">
          {items.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={cn('flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group', isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900')}>
                <div className="flex items-center gap-3">
                  <item.icon className={cn('h-4 w-4', isActive ? 'text-brand-600' : 'text-slate-400 group-hover:text-slate-600')} />
                  {item.label}
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="bg-brand-600 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">{item.badge}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
