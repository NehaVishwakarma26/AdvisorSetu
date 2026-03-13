import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { leadsApi } from '@/lib/api/leads';
import { Lead } from '@/types';

export const useAdvisorLeads = (advisorId: string) =>
  useQuery({
    queryKey: ['leads', advisorId],
    queryFn: () => leadsApi.getAdvisorLeads(advisorId),
    enabled: !!advisorId,
  });

export const useSubmitLead = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Lead, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => leadsApi.submitLead(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['leads'] }),
  });
};

export const useUpdateLeadStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ leadId, status }: { leadId: string; status: Lead['status'] }) => leadsApi.updateLeadStatus(leadId, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['leads'] }),
  });
};
