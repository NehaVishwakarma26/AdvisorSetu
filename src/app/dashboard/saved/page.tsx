'use client';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { AdvisorCard } from '@/components/advisor/AdvisorCard';
import { Button } from '@/components/ui/Button';
import { useSavedStore } from '@/store/savedAdvisorsStore';
import { DUMMY_ADVISORS } from '@/data/dummy';

export default function SavedAdvisorsPage() {
  const { savedIds } = useSavedStore();
  const savedAdvisors = DUMMY_ADVISORS.filter(a => savedIds.includes(a.id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">Saved Advisors</h1>
        <p className="text-slate-500 text-sm mt-1">{savedAdvisors.length} advisor{savedAdvisors.length !== 1 ? 's' : ''} saved</p>
      </div>

      {savedAdvisors.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <Heart className="h-10 w-10 text-slate-300 mx-auto mb-4" />
          <h3 className="font-semibold text-slate-900 text-lg">No saved advisors yet</h3>
          <p className="text-slate-500 text-sm mt-2 mb-5">Browse advisors and tap the heart icon to save your favorites</p>
          <Link href="/advisors"><Button>Browse Advisors</Button></Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {savedAdvisors.map(advisor => <AdvisorCard key={advisor.id} advisor={advisor} />)}
        </div>
      )}
    </div>
  );
}
