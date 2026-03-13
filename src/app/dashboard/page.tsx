'use client';
import Link from 'next/link';
import { Heart, CalendarClock, Star, TrendingUp, ArrowRight, Clock } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { ConsultationStatusBadge } from '@/components/dashboard/ConsultationStatusBadge';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { useSavedStore } from '@/store/savedAdvisorsStore';
import { DUMMY_ADVISORS, DUMMY_CONSULTATIONS } from '@/data/dummy';
import { formatCurrency, formatDateTime } from '@/utils/format';

export default function DashboardPage() {
  const { user } = useAuth();
  const { savedIds } = useSavedStore();
  const consultations = DUMMY_CONSULTATIONS;

  return (
    <div className="space-y-6 animate-in">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">Welcome back, {user?.name?.split(' ')[0] || 'Investor'} 👋</h1>
        <p className="text-slate-500 text-sm mt-1">Here's an overview of your financial advisory activity</p>
      </div>

     <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 stagger">
  <StatCard label="Saved Advisors" value={savedIds.length} icon={Heart} color="brand" />
  <StatCard label="Consultations" value={consultations.length} icon={CalendarClock} change="1 new" positive color="emerald" />
  <StatCard label="Pending Reviews" value={1} icon={Star} color="amber" />
  <StatCard label="Total Spent" value={formatCurrency(6500)} icon={TrendingUp} color="purple" />
</div>
      {/* Upcoming consultations */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Upcoming Consultations</h2>
          <Link href="/dashboard/consultations" className="text-sm text-brand-600 hover:text-brand-700 flex items-center gap-1">View all <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
        <div className="divide-y divide-slate-100">
          {consultations.filter(c => c.status !== 'completed').map(c => (
            <div key={c.id} className="px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar src={c.advisorAvatar} name={c.advisorName} size="md" />
                <div>
                  <p className="font-medium text-slate-900">{c.advisorName}</p>
                  <p className="text-sm text-slate-500">{c.type}</p>
                  <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5"><Clock className="h-3 w-3" />{formatDateTime(c.scheduledAt)}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ConsultationStatusBadge status={c.status} />
                <span className="text-sm font-semibold text-slate-900">{formatCurrency(c.fee)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved advisors preview */}
      {savedIds.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Saved Advisors</h2>
            <Link href="/dashboard/saved" className="text-sm text-brand-600 hover:text-brand-700 flex items-center gap-1">View all <ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>
          <div className="divide-y divide-slate-100">
            {DUMMY_ADVISORS.filter(a => savedIds.includes(a.id)).slice(0, 3).map(a => (
              <div key={a.id} className="px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Avatar src={a.avatar} name={a.name} size="md" />
                  <div>
                    <p className="font-medium text-slate-900">{a.name}</p>
                    <p className="text-sm text-slate-500">{a.city} · {a.specializations[0]}</p>
                  </div>
                </div>
                <Link href={'/advisor/' + a.id}><Button variant="outline" size="sm">View Profile</Button></Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {savedIds.length === 0 && (
        <div className="bg-brand-50 border border-brand-200 rounded-xl p-6 text-center">
          <Heart className="h-8 w-8 text-brand-400 mx-auto mb-3" />
          <h3 className="font-semibold text-slate-900">Save your first advisor</h3>
          <p className="text-slate-600 text-sm mt-1 mb-4">Browse advisors and save your favorites to compare later</p>
          <Link href="/advisors"><Button>Find Advisors</Button></Link>
        </div>
      )}
    </div>
  );
}
