'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, TrendingUp, Users, Star, CheckCircle, ArrowRight, Award, Clock, Search, MapPin } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SearchBar } from '@/components/advisor/SearchBar';
import { AdvisorCard } from '@/components/advisor/AdvisorCard';
import { StarRating } from '@/components/ui/StarRating';
import { DUMMY_ADVISORS, CITIES, SPECIALIZATIONS } from '@/data/dummy';
import { AdvisorFilters } from '@/types';

const STATS = [
  { label: 'Verified Advisors', value: '2,400+', icon: Shield },
  { label: 'Happy Investors', value: '1.2L+', icon: Users },
  { label: 'Average Rating', value: '4.8★', icon: Star },
  { label: 'Cities Covered', value: '50+', icon: MapPin },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Search & Filter', desc: 'Browse SEBI-registered advisors by city, specialization, and rating.' },
  { step: '02', title: 'Review Profile', desc: 'Check certifications, experience, client reviews, and fee structure.' },
  { step: '03', title: 'Send Inquiry', desc: 'Submit your investment goals and get personalized guidance.' },
  { step: '04', title: 'Book Consultation', desc: 'Schedule a call and start your financial journey.' },
];

export default function Home() {
  const router = useRouter();

  const handleSearch = (filters: AdvisorFilters) => {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.city) params.set('city', filters.city);
    if (filters.specialization) params.set('specialization', filters.specialization);
    router.push('/advisors?' + params.toString());
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-brand-950 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-teal-400 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-brand-600/20 border border-brand-500/30 rounded-full px-4 py-1.5 text-brand-300 text-sm font-medium mb-6">
              <CheckCircle className="h-4 w-4" /> India's #1 Financial Advisor Marketplace
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Find Your Perfect<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-teal-400">Financial Advisor</span>
            </h1>
            <p className="text-slate-300 text-lg mt-6 leading-relaxed max-w-2xl mx-auto">
              Connect with SEBI-registered advisors, mutual fund distributors, and certified financial planners. Verified professionals. Transparent fees. Real reviews.
            </p>
            <div className="mt-10 max-w-2xl mx-auto">
              <SearchBar onSearch={handleSearch} />
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-sm text-slate-400">
              <span>Popular:</span>
              {['Mutual Funds', 'Tax Planning', 'Retirement', 'SIP Planning'].map(s => (
                <button key={s} onClick={() => handleSearch({ specialization: s })} className="hover:text-brand-400 transition-colors">{s}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {STATS.map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="h-9 w-9 bg-brand-600/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-brand-400" />
                  </div>
                  <div>
                    <p className="font-bold text-white text-lg leading-none">{value}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Browse by City */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900">Browse by City</h2>
            <p className="text-slate-500 text-sm mt-1">Find advisors near you</p>
          </div>
          <Link href="/advisors" className="text-sm text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {CITIES.slice(0, 10).map(city => (
            <Link key={city} href={'/advisors?city=' + city}
              className="bg-white rounded-xl border border-slate-200 p-4 text-center hover:border-brand-400 hover:shadow-md transition-all group">
              <div className="h-10 w-10 bg-brand-50 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:bg-brand-100 transition-colors">
                <MapPin className="h-5 w-5 text-brand-600" />
              </div>
              <p className="font-medium text-slate-800 text-sm">{city}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Advisors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900">Top Advisors</h2>
            <p className="text-slate-500 text-sm mt-1">Highly rated and verified professionals</p>
          </div>
          <Link href="/advisors" className="text-sm text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DUMMY_ADVISORS.slice(0, 3).map(advisor => (
            <AdvisorCard key={advisor.id} advisor={advisor} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-slate-900">How AdvisorSetu Works</h2>
            <p className="text-slate-500 mt-3">Four simple steps to your ideal financial advisor</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map(({ step, title, desc }, i) => (
              <div key={step} className="relative">
                {i < 3 && <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-brand-200 to-transparent z-0" />}
                <div className="relative bg-slate-50 rounded-2xl p-6 border border-slate-200 text-center">
                  <div className="h-14 w-14 bg-brand-600 text-white rounded-2xl flex items-center justify-center font-display font-bold text-lg mx-auto mb-4">{step}</div>
                  <h3 className="font-display font-semibold text-slate-900 mb-2">{title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="font-display text-2xl font-bold text-slate-900">Browse by Specialization</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {SPECIALIZATIONS.map(spec => (
            <Link key={spec} href={'/advisors?specialization=' + encodeURIComponent(spec)}
              className="bg-white border border-slate-200 hover:border-brand-400 hover:bg-brand-50 rounded-full px-5 py-2.5 text-sm font-medium text-slate-700 hover:text-brand-700 transition-all">
              {spec}
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-brand-600 to-teal-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Are You a Financial Advisor?</h2>
          <p className="text-brand-100 text-lg mb-8 max-w-2xl mx-auto">Join 2,400+ verified advisors on AdvisorSetu. Get quality leads, manage consultations, and grow your practice.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/advisor-signup" className="bg-white text-brand-700 hover:bg-brand-50 px-8 py-3 rounded-xl font-semibold transition-colors">Join as Advisor</Link>
            <Link href="/advisors" className="border-2 border-white/50 text-white hover:bg-white/10 px-8 py-3 rounded-xl font-semibold transition-colors">Learn More</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
