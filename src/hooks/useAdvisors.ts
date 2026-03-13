import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { advisorsApi } from '@/lib/api/advisors';
import { AdvisorFilters } from '@/types';

export const useAdvisors = (filters: AdvisorFilters = {}) =>
  useQuery({
    queryKey: ['advisors', filters],
    queryFn: () => advisorsApi.getAdvisors(filters),
  });

export const useAdvisor = (id: string) =>
  useQuery({
    queryKey: ['advisor', id],
    queryFn: () => advisorsApi.getAdvisor(id),
    enabled: !!id,
  });
