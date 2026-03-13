import api from '@/lib/axios';
import { Advisor, AdvisorFilters, PaginatedResponse, ApiResponse } from '@/types';
import { DUMMY_ADVISORS } from '@/data/dummy';

const DEMO_MODE = true;

export const advisorsApi = {
  getAdvisors: async (filters: AdvisorFilters = {}): Promise<PaginatedResponse<Advisor>> => {
    if (DEMO_MODE) {
      await new Promise(r => setTimeout(r, 500));
      let result = [...DUMMY_ADVISORS];
      if (filters.city) result = result.filter(a => a.city.toLowerCase() === filters.city!.toLowerCase());
      if (filters.specialization) result = result.filter(a => a.specializations.some(s => s.toLowerCase().includes(filters.specialization!.toLowerCase())));
      if (filters.search) result = result.filter(a => a.name.toLowerCase().includes(filters.search!.toLowerCase()) || a.bio.toLowerCase().includes(filters.search!.toLowerCase()));
      if (filters.minRating) result = result.filter(a => a.rating >= filters.minRating!);
      const page = filters.page || 1;
      const limit = filters.limit || 12;
      const start = (page - 1) * limit;
      return { data: result.slice(start, start + limit), total: result.length, page, limit, totalPages: Math.ceil(result.length / limit) };
    }
    const response = await api.get<PaginatedResponse<Advisor>>('/advisors', { params: filters });
    return response.data;
  },

  getAdvisor: async (id: string): Promise<Advisor> => {
    if (DEMO_MODE) {
      await new Promise(r => setTimeout(r, 300));
      const advisor = DUMMY_ADVISORS.find(a => a.id === id);
      if (!advisor) throw new Error('Advisor not found');
      return advisor;
    }
    const response = await api.get<ApiResponse<Advisor>>('/advisors/' + id);
    return response.data.data;
  },

  updateAdvisorProfile: async (id: string, data: Partial<Advisor>): Promise<Advisor> => {
    if (DEMO_MODE) {
      await new Promise(r => setTimeout(r, 600));
      const advisor = DUMMY_ADVISORS.find(a => a.id === id)!;
      return { ...advisor, ...data };
    }
    const response = await api.put<ApiResponse<Advisor>>('/advisors/' + id, data);
    return response.data.data;
  },
};
