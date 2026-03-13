'use client';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Users, IndianRupee, Star, ArrowUpRight } from 'lucide-react';
import { StatCard } from '@/components/dashboard/StatCard';
import { ANALYTICS_DATA } from '@/data/dummy';
import { formatCurrency } from '@/utils/format';

const COLORS = ['#0d9488', '#14b8a6', '#2dd4bf', '#5eead4'];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-500 text-sm mt-1">Track your practice performance over time</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Leads This Month" value={ANALYTICS_DATA.leadsThisMonth} icon={Users} change={'+' + (ANALYTICS_DATA.leadsThisMonth - ANALYTICS_DATA.leadsLastMonth) + ' leads'} positive color="brand" />
        <StatCard label="Consultations" value={ANALYTICS_DATA.consultationsThisMonth} icon={TrendingUp} change={'+' + (ANALYTICS_DATA.consultationsThisMonth - ANALYTICS_DATA.consultationsLastMonth)} positive color="emerald" />
        <StatCard label="Revenue" value={formatCurrency(ANALYTICS_DATA.totalRevenue)} icon={IndianRupee} change={formatCurrency(ANALYTICS_DATA.totalRevenue - ANALYTICS_DATA.revenueLastMonth) + ' more'} positive color="purple" />
        <StatCard label="Conversion Rate" value={ANALYTICS_DATA.conversionRate + '%'} icon={Star} color="amber" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads & Consultations Trend */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-5">Leads & Consultations Trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={ANALYTICS_DATA.monthlyLeads} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Legend />
              <Line type="monotone" dataKey="leads" stroke="#0d9488" strokeWidth={2} dot={{ fill: '#0d9488' }} name="Leads" />
              <Line type="monotone" dataKey="consultations" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6' }} name="Consultations" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Lead Sources */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="font-semibold text-slate-900 mb-5">Lead Sources</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={ANALYTICS_DATA.leadSources} dataKey="value" nameKey="source" cx="50%" cy="50%" innerRadius={55} outerRadius={80}>
                  {ANALYTICS_DATA.leadSources.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => v + '%'} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 flex-1">
              {ANALYTICS_DATA.leadSources.map((item, i) => (
                <div key={item.source} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-sm text-slate-700">{item.source}</span>
                  </div>
                  <span className="font-semibold text-slate-900 text-sm">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Bar Chart */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h3 className="font-semibold text-slate-900 mb-5">Monthly Lead Volume</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={ANALYTICS_DATA.monthlyLeads} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
            <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
            <Bar dataKey="leads" fill="#0d9488" radius={[4, 4, 0, 0]} name="Leads" />
            <Bar dataKey="consultations" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Consultations" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Summary */}
      <div className="bg-gradient-to-r from-brand-600 to-teal-600 rounded-xl p-6 text-white">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h3 className="font-display font-bold text-lg">Performance Insight</h3>
            <p className="text-brand-100 text-sm mt-1">Your lead conversion rate is 65%, which is above the platform average of 48%.</p>
          </div>
          <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
            <ArrowUpRight className="h-4 w-4" />
            <span className="font-semibold">Top 15%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
