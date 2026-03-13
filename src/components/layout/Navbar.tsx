'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, TrendingUp, Bell, ChevronDown, LogOut, LayoutDashboard, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Avatar } from '@/components/ui/Avatar';
import { cn } from '@/utils/cn';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => { await logout(); router.push('/'); };

  const navLinks = [
    { href: '/advisors', label: 'Find Advisors' },
    { href: '/advisors/city', label: 'Browse by City' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-brand-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl text-slate-900">Advisor<span className="text-brand-600">Setu</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className={cn('text-sm font-medium transition-colors', pathname.startsWith(link.href) ? 'text-brand-600' : 'text-slate-600 hover:text-slate-900')}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-slate-50 transition-colors">
                  <Avatar src={user.avatar} name={user.name} size="sm" />
                  <span className="text-sm font-medium text-slate-700">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl border border-slate-200 shadow-lg py-1.5 z-50">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-sm font-medium text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500 capitalize">{user.role}</p>
                    </div>
                    <Link href={user.role === 'advisor' ? '/advisor-dashboard' : '/dashboard'} onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </Link>
                    <Link href={user.role === 'advisor' ? '/advisor-dashboard/profile' : '/dashboard'} onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                      <User className="h-4 w-4" /> Profile
                    </Link>
                    <hr className="my-1 border-slate-100" />
                    <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left">
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2">Log In</Link>
                <Link href="/register" className="text-sm font-medium bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg transition-colors">Get Started</Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg hover:bg-slate-100">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-slate-700 py-2">{link.label}</Link>
          ))}
          {isAuthenticated && user ? (
            <>
              <Link href={user.role === 'advisor' ? '/advisor-dashboard' : '/dashboard'} onClick={() => setMobileOpen(false)} className="block text-sm font-medium text-brand-600 py-2">Dashboard</Link>
              <button onClick={handleLogout} className="block text-sm font-medium text-red-600 py-2">Sign Out</button>
            </>
          ) : (
            <div className="flex gap-3 pt-2">
              <Link href="/login" className="flex-1 text-center text-sm font-medium border border-slate-300 text-slate-700 py-2 rounded-lg">Log In</Link>
              <Link href="/register" className="flex-1 text-center text-sm font-medium bg-brand-600 text-white py-2 rounded-lg">Get Started</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
