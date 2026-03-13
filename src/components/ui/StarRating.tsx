import { Star } from 'lucide-react';
import { cn } from '@/utils/cn';

interface StarRatingProps { rating: number; max?: number; size?: 'sm' | 'md' | 'lg'; showValue?: boolean; className?: string; }

export const StarRating = ({ rating, max = 5, size = 'md', showValue = true, className }: StarRatingProps) => {
  const sizes = { sm: 'h-3 w-3', md: 'h-4 w-4', lg: 'h-5 w-5' };
  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex">
        {Array.from({ length: max }).map((_, i) => (
          <Star key={i} className={cn(sizes[size], i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : i < rating ? 'fill-amber-200 text-amber-400' : 'fill-slate-200 text-slate-300')} />
        ))}
      </div>
      {showValue && <span className={cn('font-semibold text-slate-700', size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm')}>{rating.toFixed(1)}</span>}
    </div>
  );
};
