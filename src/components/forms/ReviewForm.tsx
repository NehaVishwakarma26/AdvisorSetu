'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { useSubmitReview } from '@/hooks/useReviews';
import { useAuth } from '@/hooks/useAuth';
import { DUMMY_INVESTOR } from '@/data/dummy';

export const ReviewForm = ({ advisorId, onSuccess }: { advisorId: string; onSuccess?: () => void }) => {
  const { user } = useAuth();
  const { mutate, isPending } = useSubmitReview();
  const [hoveredStar, setHoveredStar] = useState(0);
  const [rating, setRating] = useState(0);
  const { register, handleSubmit, formState: { errors } } = useForm<{ comment: string }>();

  const onSubmit = ({ comment }: { comment: string }) => {
    if (!rating) return;
    const investor = user || DUMMY_INVESTOR;
    mutate({ advisorId, investorId: investor.id, investorName: investor.name, investorAvatar: investor.avatar, rating, comment }, {
      onSuccess: () => { onSuccess?.(); },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <p className="text-sm font-medium text-slate-700 mb-2">Your Rating</p>
        <div className="flex gap-1">
          {[1,2,3,4,5].map(s => (
            <button key={s} type="button" onMouseEnter={() => setHoveredStar(s)} onMouseLeave={() => setHoveredStar(0)} onClick={() => setRating(s)}>
              <Star className={`h-7 w-7 transition-colors ${s <= (hoveredStar || rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
            </button>
          ))}
        </div>
        {!rating && <p className="text-xs text-red-500 mt-1">Please select a rating</p>}
      </div>
      <Textarea label="Your Review" rows={4} placeholder="Share your experience with this advisor..." {...register('comment', { required: 'Please write a review' })} error={errors.comment?.message} />
      <Button type="submit" loading={isPending} disabled={!rating} className="w-full">Submit Review</Button>
    </form>
  );
};
