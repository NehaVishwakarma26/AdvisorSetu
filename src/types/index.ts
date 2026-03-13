export type UserRole = 'investor' | 'advisor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  city?: string;
  createdAt: string;
}

export interface Advisor {
  id: string;
  userId: string;
  name: string;
  email: string;
  avatar?: string;
  city: string;
  specializations: string[];
  experience: number;
  rating: number;
  reviewCount: number;
  clientCount: number;
  bio: string;
  services: Service[];
  certifications: Certification[];
  fees: FeeStructure;
  languages: string[];
  isVerified: boolean;
  isAvailable: boolean;
  responseTime: string;
  aum?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: string;
  price?: number;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: number;
  badge?: string;
}

export interface FeeStructure {
  consultationFee: number;
  annualFee?: number;
  aum?: string;
  currency: string;
}

export interface Lead {
  id: string;
  investorId: string;
  advisorId: string;
  investorName: string;
  investorEmail: string;
  investorPhone: string;
  message: string;
  investmentGoal: string;
  investmentAmount: string;
  status: 'new' | 'contacted' | 'accepted' | 'rejected' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface Consultation {
  id: string;
  investorId: string;
  advisorId: string;
  advisorName: string;
  advisorAvatar?: string;
  scheduledAt: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  type: string;
  fee: number;
}

export interface Review {
  id: string;
  investorId: string;
  investorName: string;
  investorAvatar?: string;
  advisorId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest { email: string; password: string; }
export interface RegisterRequest { name: string; email: string; password: string; role: UserRole; phone?: string; city?: string; }

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AdvisorFilters {
  city?: string;
  specialization?: string;
  minRating?: number;
  maxFee?: number;
  language?: string;
  search?: string;
  page?: number;
  limit?: number;
}
