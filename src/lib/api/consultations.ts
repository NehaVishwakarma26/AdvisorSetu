import api from '@/lib/axios';
import { Consultation, ApiResponse } from '@/types';
import { DUMMY_CONSULTATIONS } from '@/data/dummy';

const DEMO_MODE = true;

export const consultationsApi = {
  getInvestorConsultations: async (investorId: string): Promise<Consultation[]> => {
    if (DEMO_MODE) {
      await new Promise(r => setTimeout(r, 400));
      return DUMMY_CONSULTATIONS.filter(c => c.investorId === investorId);
    }
    const response = await api.get<ApiResponse<Consultation[]>>('/investors/' + investorId + '/consultations');
    return response.data.data;
  },
};
