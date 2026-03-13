'use client';
import Link from 'next/link';
import { MapPin, Users } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CITIES, DUMMY_ADVISORS } from '@/data/dummy';

export default function BrowseByCityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl font-bold text-slate-900">Browse Advisors by City</h1>
          <p className="text-slate-500 mt-3">Find verified financial advisors in your city</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CITIES.map(city => {
            const count = DUMMY_ADVISORS.filter(a => a.city === city).length;
            return (
              <Link key={city} href={'/advisors?city=' + city}
                className="bg-white rounded-xl border border-slate-200 p-6 hover:border-brand-400 hover:shadow-md transition-all group">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 bg-brand-50 rounded-xl flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                    <MapPin className="h-6 w-6 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 group-hover:text-brand-700 transition-colors">{city}</h3>
                    <div className="flex items-center gap-1 text-sm text-slate-500 mt-0.5">
                      <Users className="h-3.5 w-3.5" />
                      {count > 0 ? `${count} advisors` : 'Advisors available'}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
