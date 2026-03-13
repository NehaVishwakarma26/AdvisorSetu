# AdvisorSetu – Frontend

> India's premier financial advisor marketplace. Built with Next.js 14, TypeScript, TailwindCSS, React Query, and Zustand.

## 🚀 Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## 🔐 Demo Login Credentials

| Role     | Email                       | Password |
|----------|-----------------------------|----------|
| Investor | any@email.com               | any      |
| Advisor  | advisor@demo.com            | any      |
|          | rajesh.mehta@example.com    | any      |

## 📁 Folder Structure

```
src/
├── app/                         # Next.js App Router pages
│   ├── page.tsx                 # / Landing page
│   ├── advisors/
│   │   ├── page.tsx             # /advisors  – Listing + filters
│   │   └── city/page.tsx        # /advisors/city – Browse by city
│   ├── advisor/[id]/page.tsx    # /advisor/:id – Profile page
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── investor/signup/page.tsx
│   ├── advisor-signup/page.tsx
│   ├── dashboard/               # Investor dashboard (role-protected)
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── saved/page.tsx
│   │   ├── consultations/page.tsx
│   │   └── reviews/page.tsx
│   └── advisor-dashboard/       # Advisor dashboard (role-protected)
│       ├── layout.tsx
│       ├── page.tsx
│       ├── leads/page.tsx
│       ├── profile/page.tsx
│       └── analytics/page.tsx
│
├── components/
│   ├── ui/                      # Base UI: Button, Badge, Input, Card, Avatar, StarRating
│   ├── layout/                  # Navbar, Footer, DashboardSidebar, ProtectedRoute
│   ├── advisor/                 # AdvisorCard, ReviewCard, SearchBar
│   ├── dashboard/               # StatCard, LeadStatusBadge, ConsultationStatusBadge
│   └── forms/                   # LeadForm, ReviewForm
│
├── lib/
│   ├── axios.ts                 # Axios instance + JWT interceptors
│   ├── queryClient.ts           # React Query client
│   └── api/                     # API modules: auth, advisors, leads, reviews, consultations
│
├── hooks/                       # useAuth, useAdvisors, useLeads, useReviews
├── store/                       # Zustand: authStore, savedAdvisorsStore
├── types/index.ts               # All TypeScript types
├── data/dummy.ts                # Demo data (6 advisors, leads, reviews, etc.)
└── utils/                       # cn(), format helpers
```

## ⚙️ Tech Stack

- **Next.js 14** App Router
- **TypeScript** throughout
- **TailwindCSS** (custom brand palette, custom fonts)
- **React Query v5** for server state
- **Zustand** for client state (auth, saved advisors)
- **React Hook Form + Zod** for forms
- **Recharts** for analytics charts
- **Axios** with JWT interceptor + refresh token logic

## 🔑 Role-Based Access

- `ProtectedRoute` component wraps all dashboard layouts
- Checks `isAuthenticated` and `user.role` via Zustand auth store
- Redirects investors trying to access advisor dashboard and vice versa
- JWT tokens stored in localStorage with refresh token rotation

## 🔌 Backend Integration

Set your API base URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

All API calls are in `src/lib/api/`. Set `DEMO_MODE = false` in each file to switch from dummy data to real API calls.

## 🎨 Design System

- **Fonts**: Outfit (display/headings) + DM Sans (body)
- **Primary color**: Teal/brand-600 (`#0d9488`)
- **Clean fintech aesthetic** inspired by Groww/Zerodha
- **Responsive**: mobile-first layouts throughout
