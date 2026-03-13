import api from '@/lib/axios';
import { Lead, ApiResponse } from '@/types';
import { DUMMY_LEADS } from '@/data/dummy';

const DEMO_MODE = true;

export const leadsApi = {
  submitLead: async (data: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<Lead> => {
    if (DEMO_MODE) {
      await new Promise(r => setTimeout(r, 700));
      return { ...data, id: 'lead-' + Date.now(), status: 'new', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
    }
    const response = await api.post<ApiResponse<Lead>>('/leads', data);
    return response.data.data;
  },

  getAdvisorLeads: async (advisorId: string): Promise<Lead[]> => {
    if (DEMO_MODE) {
      await new Promise(r => setTimeout(r, 400));
      return DUMMY_LEADS.filter(l => l.advisorId === advisorId);
    }
    const response = await api.get<ApiResponse<Lead[]>>('/advisors/' + advisorId + '/leads');
    return response.data.data;
  },

  updateLeadStatus: async (leadId: string, status: Lead['status']): Promise<Lead> => {
    if (DEMO_MODE) {
      await new Promise(r => setTimeout(r, 400));
      const lead = DUMMY_LEADS.find(l => l.id === leadId)!;
      return { ...lead, status, updatedAt: new Date().toISOString() };
    }
    const response = await api.patch<ApiResponse<Lead>>('/leads/' + leadId + '/status', { status });
    return response.data.data;
  },
};
