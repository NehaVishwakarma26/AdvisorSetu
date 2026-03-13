'use client';
import { LayoutDashboard, Heart, CalendarClock, Star, User } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/saved', label: 'Saved Advisors', icon: Heart },
  { href: '/dashboard/consultations', label: 'Consultations', icon: CalendarClock },
  { href: '/dashboard/reviews', label: 'My Reviews', icon: Star },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute requiredRole="investor">
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-6 flex-1 w-full">
          <DashboardSidebar title="Investor Dashboard" items={navItems} />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
