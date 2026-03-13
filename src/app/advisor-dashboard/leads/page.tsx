'use client';
import { useState } from 'react';
import { Phone, Mail, Check, X, MessageSquare, Clock } from 'lucide-react';
import { LeadStatusBadge } from '@/components/dashboard/LeadStatusBadge';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAdvisorLeads, useUpdateLeadStatus } from '@/hooks/useLeads';
import { DUMMY_LEADS } from '@/data/dummy';
import { Lead } from '@/types';
import { formatDate, formatCurrency } from '@/utils/format';

const TABS = ['all', 'new', 'contacted', 'accepted', 'completed', 'rejected'] as const;

export default function LeadsPage() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('all');
  const { mutate: updateStatus } = useUpdateLeadStatus();
  const [leads, setLeads] = useState<Lead[]>(DUMMY_LEADS);

  const handleStatus = (leadId: string, status: Lead['status']) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status } : l));
  };

  const filtered = activeTab === 'all' ? leads : leads.filter(l => l.status === activeTab);
  const newCount = leads.filter(l => l.status === 'new').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">Leads</h1>
        <p className="text-slate-500 text-sm mt-1">Manage investor inquiries and consultations</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {TABS.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${activeTab === tab ? 'bg-brand-600 text-white' : 'bg-white border border-slate-300 text-slate-600 hover:border-brand-400'}`}>
            {tab}
            {tab === 'new' && newCount > 0 && <span className={`rounded-full text-xs px-1.5 ${activeTab === tab ? 'bg-white text-brand-600' : 'bg-brand-600 text-white'}`}>{newCount}</span>}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <MessageSquare className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No leads in this category</p>
          </div>
        ) : filtered.map(lead => (
          <div key={lead.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-start gap-3">
                <Avatar name={lead.investorName} size="lg" />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-slate-900">{lead.investorName}</p>
                    <LeadStatusBadge status={lead.status} />
                  </div>
                  <div className="flex flex-wrap gap-3 mt-1">
                    <a href={'mailto:' + lead.investorEmail} className="flex items-center gap-1 text-xs text-slate-500 hover:text-brand-600"><Mail className="h-3 w-3" />{lead.investorEmail}</a>
                    <a href={'tel:' + lead.investorPhone} className="flex items-center gap-1 text-xs text-slate-500 hover:text-brand-600"><Phone className="h-3 w-3" />{lead.investorPhone}</a>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="brand">{lead.investmentGoal}</Badge>
                    <Badge variant="default">{lead.investmentAmount}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="h-3 w-3" />{formatDate(lead.createdAt)}
              </div>
            </div>

            <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
              <p className="text-sm text-slate-700 italic">"{lead.message}"</p>
            </div>

            {lead.status === 'new' && (
              <div className="mt-4 flex gap-2">
                <Button size="sm" onClick={() => handleStatus(lead.id, 'accepted')}>
                  <Check className="h-4 w-4" /> Accept Lead
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleStatus(lead.id, 'contacted')}>
                  <Phone className="h-4 w-4" /> Mark Contacted
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleStatus(lead.id, 'rejected')}>
                  <X className="h-4 w-4" /> Decline
                </Button>
              </div>
            )}
            {lead.status === 'accepted' && (
              <div className="mt-4 flex gap-2">
                <Button size="sm" onClick={() => handleStatus(lead.id, 'completed')}>
                  <Check className="h-4 w-4" /> Mark Completed
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
