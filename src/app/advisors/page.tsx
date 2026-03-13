'use client';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AdvisorCard } from '@/components/advisor/AdvisorCard';
import { SearchBar } from '@/components/advisor/SearchBar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useAdvisors } from '@/hooks/useAdvisors';
import { AdvisorFilters } from '@/types';
import { CITIES, SPECIALIZATIONS } from '@/data/dummy';

export default function AdvisorsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState<AdvisorFilters>({
    city: searchParams.get('city') || '',
    specialization: searchParams.get('specialization') || '',
    search: searchParams.get('search') || '',
    minRating: undefined,
    page: 1,
    limit: 12,
  });
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading } = useAdvisors(filters);

  const handleSearch = (f: AdvisorFilters) => setFilters(prev => ({ ...prev, ...f, page: 1 }));

  const clearFilter = (key: keyof AdvisorFilters) => setFilters(prev => ({ ...prev, [key]: undefined, page: 1 }));

  const activeFilters = Object.entries(filters).filter(([k, v]) => v && !['page', 'limit'].includes(k));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-display text-2xl font-bold text-slate-900 mb-5">Find Financial Advisors</h1>
          <SearchBar onSearch={handleSearch} compact />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1">
        <div className="flex gap-6">
          {/* Sidebar filters (desktop) */}
          <aside className="w-64 flex-shrink-0 hidden lg:block">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sticky top-24">
              <h3 className="font-semibold text-slate-900 mb-4">Filters</h3>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
                  <select value={filters.city || ''} onChange={e => setFilters(p => ({ ...p, city: e.target.value || undefined, page: 1 }))}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400">
                    <option value="">All Cities</option>
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Specialization</label>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    {SPECIALIZATIONS.map(spec => (
                      <label key={spec} className="flex items-center gap-2 cursor-pointer group">
                        <input type="checkbox" checked={filters.specialization === spec}
                          onChange={e => setFilters(p => ({ ...p, specialization: e.target.checked ? spec : undefined, page: 1 }))}
                          className="rounded border-slate-300 text-brand-600 focus:ring-brand-400" />
                        <span className="text-sm text-slate-700 group-hover:text-slate-900">{spec}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Minimum Rating</label>
                  <div className="space-y-1.5">
                    {[4.5, 4, 3.5].map(r => (
                      <label key={r} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="rating" checked={filters.minRating === r}
                          onChange={() => setFilters(p => ({ ...p, minRating: r, page: 1 }))}
                          className="text-brand-600 focus:ring-brand-400" />
                        <span className="text-sm text-slate-700">{r}+ stars</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full" size="sm" onClick={() => setFilters({ page: 1, limit: 12 })}>Clear All Filters</Button>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Active filters */}
            {activeFilters.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {activeFilters.map(([key, val]) => (
                  <Badge key={key} variant="brand" className="gap-1.5 cursor-pointer" onClick={() => clearFilter(key as keyof AdvisorFilters)}>
                    {String(val)} <X className="h-3 w-3" />
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-slate-600">
                {isLoading ? 'Loading...' : `${data?.total || 0} advisors found`}
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-xl border border-slate-200 h-80 animate-pulse" />
                ))}
              </div>
            ) : data?.data.length === 0 ? (
              <div className="text-center py-20">
                <div className="h-16 w-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <SlidersHorizontal className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="font-semibold text-slate-900">No advisors found</h3>
                <p className="text-slate-500 text-sm mt-2">Try adjusting your filters or search terms</p>
                <Button variant="outline" className="mt-4" onClick={() => setFilters({ page: 1, limit: 12 })}>Clear Filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {data?.data.map(advisor => (
                  <AdvisorCard key={advisor.id} advisor={advisor} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {data && data.totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <Button variant="outline" size="sm" disabled={filters.page === 1} onClick={() => setFilters(p => ({ ...p, page: (p.page || 1) - 1 }))}>Previous</Button>
                {Array.from({ length: data.totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setFilters(prev => ({ ...prev, page: p }))}
                    className={`h-9 w-9 rounded-lg text-sm font-medium transition-colors ${filters.page === p ? 'bg-brand-600 text-white' : 'bg-white border border-slate-300 text-slate-700 hover:border-brand-400'}`}>
                    {p}
                  </button>
                ))}
                <Button variant="outline" size="sm" disabled={filters.page === data.totalPages} onClick={() => setFilters(p => ({ ...p, page: (p.page || 1) + 1 }))}>Next</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
