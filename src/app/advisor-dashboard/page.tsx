'use client';
import Link from 'next/link';
import { Users, TrendingUp, IndianRupee, Star, ArrowRight, Clock } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { LeadStatusBadge } from '@/components/dashboard/LeadStatusBadge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { useAuth } from '@/hooks/useAuth';
import { DUMMY_LEADS, DUMMY_ADVISORS, ANALYTICS_DATA } from '@/data/dummy';
import { formatCurrency, formatDate } from '@/utils/format';

export default function AdvisorDashboardPage() {
  const { user } = useAuth();
  const recentLeads = DUMMY_LEADS.slice(0, 4);
  const advisor = DUMMY_ADVISORS[0];

  return (
    <div className="space-y-6 animate-in">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Good morning, {user?.name?.split(' ')[0] || 'Advisor'} 👋</h1>
          <p className="text-slate-500 text-sm mt-1">Here's what's happening with your practice today</p>
        </div>
        <Link href="/advisor-dashboard/profile"><Button variant="outline" size="sm">Edit Profile</Button></Link>
      </div>

      {/* Profile completion banner */}
      <div className="bg-gradient-to-r from-brand-600 to-teal-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-semibold">Profile Completion: 85%</p>
            <p className="text-brand-100 text-sm mt-0.5">Add your photo and remaining certifications to attract more clients</p>
          </div>
          <Link href="/advisor-dashboard/profile">
            <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">Complete Profile</button>
          </Link>
        </div>
        <div className="mt-3 bg-white/20 rounded-full h-1.5">
          <div className="bg-white h-1.5 rounded-full w-[85%]" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 stagger">
        <StatCard label="New Leads" value={ANALYTICS_DATA.leadsThisMonth} icon={Users} change="4 leads" positive color="brand" />
        <StatCard label="Consultations" value={ANALYTICS_DATA.consultationsThisMonth} icon={TrendingUp} change="2 more" positive color="emerald" />
        <StatCard label="Revenue (Month)" value={formatCurrency(ANALYTICS_DATA.totalRevenue)} icon={IndianRupee} change="50% more" positive color="purple" />
        <StatCard label="Avg Rating" value={ANALYTICS_DATA.avgRating + '/5.0'} icon={Star} color="amber" />
      </div>

      {/* Recent Leads */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Recent Leads</h2>
          <Link href="/advisor-dashboard/leads" className="text-sm text-brand-600 hover:text-brand-700 flex items-center gap-1">View all <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>
        <div className="divide-y divide-slate-100">
          {recentLeads.map(lead => (
            <div key={lead.id} className="px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <Avatar name={lead.investorName} size="md" />
                <div>
                  <p className="font-medium text-slate-900">{lead.investorName}</p>
                  <p className="text-sm text-slate-500">{lead.investmentGoal} · {lead.investmentAmount}</p>
                  <div className="flex items-center gap-1 text-xs text-slate-400 mt-0.5"><Clock className="h-3 w-3" />{formatDate(lead.createdAt)}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <LeadStatusBadge status={lead.status} />
                {lead.status === 'new' && (
                  <div className="flex gap-1">
                    <button className="text-xs bg-brand-600 text-white px-3 py-1.5 rounded-lg hover:bg-brand-700 transition-colors">Accept</button>
                    <button className="text-xs border border-slate-300 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">Decline</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
