import api from '@/lib/axios';
import { LoginRequest, RegisterRequest, ApiResponse, AuthTokens, User } from '@/types';
import { DUMMY_INVESTOR, DUMMY_ADVISOR_USER } from '@/data/dummy';

const DEMO_MODE = true;

export const authApi = {
  login: async (data: LoginRequest): Promise<{ tokens: AuthTokens; user: User }> => {
    if (DEMO_MODE) {
      await new Promise(r => setTimeout(r, 800));
      const isAdvisor = data.email.includes('advisor') || data.email === 'rajesh.mehta@example.com';
      const user = isAdvisor ? DUMMY_ADVISOR_USER : DUMMY_INVESTOR;
      return { tokens: { accessToken: 'demo-token-' + Date.now(), refreshToken: 'demo-refresh' }, user };
    }
    const response = await api.post<ApiResponse<{ tokens: AuthTokens; user: User }>>('/auth/login', data);
    return response.data.data;
  },

  register: async (data: RegisterRequest): Promise<{ tokens: AuthTokens; user: User }> => {
    if (DEMO_MODE) {
      await new Promise(r => setTimeout(r, 1000));
      const user: User = { id: 'new-' + Date.now(), name: data.name, email: data.email, role: data.role, phone: data.phone, city: data.city, createdAt: new Date().toISOString() };
      return { tokens: { accessToken: 'demo-token-' + Date.now(), refreshToken: 'demo-refresh' }, user };
    }
    const response = await api.post<ApiResponse<{ tokens: AuthTokens; user: User }>>('/auth/register', data);
    return response.data.data;
  },

  logout: async () => {
    if (DEMO_MODE) return;
    await api.post('/auth/logout');
  },
};
