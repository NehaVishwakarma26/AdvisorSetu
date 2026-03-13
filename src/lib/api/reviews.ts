import api from '@/lib/axios';
import { Review, ApiResponse } from '@/types';
import { DUMMY_REVIEWS } from '@/data/dummy';

const DEMO_MODE = true;

export const reviewsApi = {
  getAdvisorReviews: async (advisorId: string): Promise<Review[]> => {
    if (DEMO_MODE) {
      await new Promise(r => setTimeout(r, 300));
      return DUMMY_REVIEWS.filter(r => r.advisorId === advisorId);
    }
    const response = await api.get<ApiResponse<Review[]>>('/advisors/' + advisorId + '/reviews');
    return response.data.data;
  },

  submitReview: async (data: Omit<Review, 'id' | 'createdAt'>): Promise<Review> => {
    if (DEMO_MODE) {
      await new Promise(r => setTimeout(r, 600));
      return { ...data, id: 'rev-' + Date.now(), createdAt: new Date().toISOString() };
    }
    const response = await api.post<ApiResponse<Review>>('/reviews', data);
    return response.data.data;
  },
};
