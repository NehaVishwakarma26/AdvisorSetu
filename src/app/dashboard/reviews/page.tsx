'use client';
import { useState } from 'react';
import { Star, Plus } from 'lucide-react';
import { ReviewCard } from '@/components/advisor/ReviewCard';
import { ReviewForm } from '@/components/forms/ReviewForm';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { DUMMY_REVIEWS, DUMMY_ADVISORS } from '@/data/dummy';

export default function ReviewsPage() {
  const [showForm, setShowForm] = useState<string | null>(null);
  const myReviews = DUMMY_REVIEWS.filter(r => r.investorId === 'inv1');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">My Reviews</h1>
        <p className="text-slate-500 text-sm mt-1">Share your experience to help other investors</p>
      </div>

      {/* Pending reviews */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h3 className="font-semibold text-amber-900 mb-3">Pending Reviews</h3>
        <div className="bg-white rounded-lg border border-amber-100 p-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <Avatar src={DUMMY_ADVISORS[1].avatar} name={DUMMY_ADVISORS[1].name} size="md" />
              <div>
                <p className="font-medium text-slate-900">{DUMMY_ADVISORS[1].name}</p>
                <p className="text-sm text-slate-500">Retirement Planning · Completed on Jul 15</p>
              </div>
            </div>
            <Button size="sm" onClick={() => setShowForm(DUMMY_ADVISORS[1].id)}>
              <Star className="h-4 w-4" /> Leave Review
            </Button>
          </div>
          {showForm === DUMMY_ADVISORS[1].id && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <ReviewForm advisorId={DUMMY_ADVISORS[1].id} onSuccess={() => setShowForm(null)} />
            </div>
          )}
        </div>
      </div>

      {/* Past reviews */}
      <div>
        <h3 className="font-semibold text-slate-900 mb-4">Reviews You've Written ({myReviews.length})</h3>
        {myReviews.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
            <Star className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No reviews yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {myReviews.map(r => <ReviewCard key={r.id} review={r} />)}
          </div>
        )}
      </div>
    </div>
  );
}
