'use client';
import { useState } from 'react';
import { Search, MapPin, Briefcase, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CITIES, SPECIALIZATIONS } from '@/data/dummy';
import { AdvisorFilters } from '@/types';

interface SearchBarProps { onSearch: (filters: AdvisorFilters) => void; compact?: boolean; }

export const SearchBar = ({ onSearch, compact }: SearchBarProps) => {
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [specialization, setSpecialization] = useState('');

  const handleSearch = () => onSearch({ search: search || undefined, city: city || undefined, specialization: specialization || undefined });

  if (compact) return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} placeholder="Search advisors..." className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400" />
      </div>
      <Button onClick={handleSearch} size="sm"><Search className="h-4 w-4" /></Button>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-2">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch()} placeholder="Search by name or expertise..." className="w-full pl-9 pr-4 py-3 rounded-xl border-0 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 bg-slate-50" />
        </div>
        <div className="relative sm:w-44">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <select value={city} onChange={e => setCity(e.target.value)} className="w-full pl-9 pr-4 py-3 rounded-xl border-0 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 bg-slate-50 appearance-none">
            <option value="">All Cities</option>
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="relative sm:w-48">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <select value={specialization} onChange={e => setSpecialization(e.target.value)} className="w-full pl-9 pr-4 py-3 rounded-xl border-0 text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 bg-slate-50 appearance-none">
            <option value="">All Specializations</option>
            {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <Button onClick={handleSearch} size="lg" className="rounded-xl px-8">Search</Button>
      </div>
    </div>
  );
};
