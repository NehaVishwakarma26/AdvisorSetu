import apiClient from "./api-client";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  Advisor,
  AdvisorFilters,
  PaginatedResponse,
  Lead,
  CreateLeadRequest,
  Consultation,
  Review,
  CreateReviewRequest,
  SavedAdvisor,
  AdvisorAnalytics,
  Certification,
  Service,
} from "@/types";

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<AuthResponse>("/auth/login", data).then((r) => r.data),

  register: (data: RegisterRequest) =>
    apiClient.post<AuthResponse>("/auth/register", data).then((r) => r.data),

  logout: () => apiClient.post("/auth/logout").then((r) => r.data),

  me: () => apiClient.get("/auth/me").then((r) => r.data),

  refreshToken: (refreshToken: string) =>
    apiClient.post<{ accessToken: string }>("/auth/refresh", { refreshToken }).then((r) => r.data),
};

// ─── Advisors ─────────────────────────────────────────────────────────────────

export const advisorApi = {
  getAll: (filters?: AdvisorFilters) =>
    apiClient
      .get<PaginatedResponse<Advisor>>("/advisors", { params: filters })
      .then((r) => r.data),

  getById: (id: string) =>
    apiClient.get<Advisor>(`/advisors/${id}`).then((r) => r.data),

  getByCity: (city: string, filters?: Omit<AdvisorFilters, "city">) =>
    apiClient
      .get<PaginatedResponse<Advisor>>(`/advisors/city/${city}`, { params: filters })
      .then((r) => r.data),

  getFeatured: () =>
    apiClient.get<Advisor[]>("/advisors/featured").then((r) => r.data),

  getProfile: () =>
    apiClient.get<Advisor>("/advisor/profile").then((r) => r.data),

  updateProfile: (data: Partial<Advisor>) =>
    apiClient.put<Advisor>("/advisor/profile", data).then((r) => r.data),

  addCertification: (data: Omit<Certification, "id">) =>
    apiClient.post<Certification>("/advisor/certifications", data).then((r) => r.data),

  deleteCertification: (id: string) =>
    apiClient.delete(`/advisor/certifications/${id}`).then((r) => r.data),

  addService: (data: Omit<Service, "id">) =>
    apiClient.post<Service>("/advisor/services", data).then((r) => r.data),

  deleteService: (id: string) =>
    apiClient.delete(`/advisor/services/${id}`).then((r) => r.data),

  getAnalytics: () =>
    apiClient.get<AdvisorAnalytics>("/advisor/analytics").then((r) => r.data),
};

// ─── Leads ────────────────────────────────────────────────────────────────────

export const leadApi = {
  create: (data: CreateLeadRequest) =>
    apiClient.post<Lead>("/leads", data).then((r) => r.data),

  getMyLeads: () =>
    apiClient.get<Lead[]>("/leads/my").then((r) => r.data),

  getAdvisorLeads: () =>
    apiClient.get<Lead[]>("/leads/advisor").then((r) => r.data),

  updateStatus: (id: string, status: "accepted" | "rejected") =>
    apiClient.patch<Lead>(`/leads/${id}/status`, { status }).then((r) => r.data),
};

// ─── Consultations ────────────────────────────────────────────────────────────

export const consultationApi = {
  getMyConsultations: () =>
    apiClient.get<Consultation[]>("/consultations/my").then((r) => r.data),

  schedule: (leadId: string, scheduledAt: string) =>
    apiClient.post<Consultation>("/consultations", { leadId, scheduledAt }).then((r) => r.data),

  updateStatus: (id: string, status: "completed" | "cancelled") =>
    apiClient.patch<Consultation>(`/consultations/${id}`, { status }).then((r) => r.data),
};

// ─── Reviews ──────────────────────────────────────────────────────────────────

export const reviewApi = {
  getAdvisorReviews: (advisorId: string) =>
    apiClient.get<Review[]>(`/reviews/advisor/${advisorId}`).then((r) => r.data),

  getMyReviews: () =>
    apiClient.get<Review[]>("/reviews/my").then((r) => r.data),

  create: (data: CreateReviewRequest) =>
    apiClient.post<Review>("/reviews", data).then((r) => r.data),

  delete: (id: string) =>
    apiClient.delete(`/reviews/${id}`).then((r) => r.data),
};

// ─── Saved Advisors ───────────────────────────────────────────────────────────

export const savedApi = {
  getSaved: () =>
    apiClient.get<SavedAdvisor[]>("/saved").then((r) => r.data),

  save: (advisorId: string) =>
    apiClient.post<SavedAdvisor>("/saved", { advisorId }).then((r) => r.data),

  unsave: (advisorId: string) =>
    apiClient.delete(`/saved/${advisorId}`).then((r) => r.data),
};
