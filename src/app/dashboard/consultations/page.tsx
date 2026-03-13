'use client';
import { useState } from 'react';
import { CalendarClock, Video } from 'lucide-react';
import { ConsultationStatusBadge } from '@/components/dashboard/ConsultationStatusBadge';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { DUMMY_CONSULTATIONS } from '@/data/dummy';
import { formatCurrency, formatDateTime } from '@/utils/format';
import { Consultation } from '@/types';

const TABS: Consultation['status'][] = ['pending', 'confirmed', 'completed', 'cancelled'];

export default function ConsultationsPage() {
  const [activeTab, setActiveTab] = useState<'all' | Consultation['status']>('all');
  const filtered = activeTab === 'all' ? DUMMY_CONSULTATIONS : DUMMY_CONSULTATIONS.filter(c => c.status === activeTab);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">Consultations</h1>
        <p className="text-slate-500 text-sm mt-1">Track all your advisor consultations</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setActiveTab('all')} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${activeTab === 'all' ? 'bg-brand-600 text-white' : 'bg-white border border-slate-300 text-slate-600 hover:border-brand-400'}`}>All</button>
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'bg-brand-600 text-white' : 'bg-white border border-slate-300 text-slate-600 hover:border-brand-400'}`}>{tab}</button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <CalendarClock className="h-10 w-10 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No consultations found</p>
          </div>
        ) : (
          filtered.map(c => (
            <div key={c.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-start gap-3">
                  <Avatar src={c.advisorAvatar} name={c.advisorName} size="lg" />
                  <div>
                    <p className="font-semibold text-slate-900">{c.advisorName}</p>
                    <p className="text-sm text-slate-500">{c.type}</p>
                    <p className="text-xs text-slate-400 mt-1">{formatDateTime(c.scheduledAt)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ConsultationStatusBadge status={c.status} />
                  <span className="font-semibold text-slate-900">{formatCurrency(c.fee)}</span>
                </div>
              </div>
              {c.status === 'confirmed' && (
                <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                  <Button size="sm"><Video className="h-4 w-4" /> Join Call</Button>
                  <Button size="sm" variant="outline">Reschedule</Button>
                </div>
              )}
              {c.status === 'completed' && (
                <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
                  <Button size="sm" variant="secondary">Leave Review</Button>
                  <Button size="sm" variant="outline">Book Again</Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
