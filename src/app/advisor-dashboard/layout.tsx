'use client';
import { LayoutDashboard, Users, UserCircle, BarChart3 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { DUMMY_LEADS } from '@/data/dummy';

export default function AdvisorDashboardLayout({ children }: { children: React.ReactNode }) {
  const newLeads = DUMMY_LEADS.filter(l => l.status === 'new').length;
  const navItems = [
    { href: '/advisor-dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/advisor-dashboard/leads', label: 'Leads', icon: Users, badge: newLeads },
    { href: '/advisor-dashboard/profile', label: 'My Profile', icon: UserCircle },
    { href: '/advisor-dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <ProtectedRoute requiredRole="advisor">
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-6 flex-1 w-full">
          <DashboardSidebar title="Advisor Dashboard" items={navItems} />
          <main className="flex-1 min-w-0">{children}</main>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
