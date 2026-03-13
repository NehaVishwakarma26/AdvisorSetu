import { Review } from '@/types';
import { Avatar } from '@/components/ui/Avatar';
import { StarRating } from '@/components/ui/StarRating';
import { formatDate } from '@/utils/format';

export const ReviewCard = ({ review }: { review: Review }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5">
    <div className="flex items-start gap-3">
      <Avatar src={review.investorAvatar} name={review.investorName} size="md" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="font-semibold text-slate-900">{review.investorName}</p>
          <span className="text-xs text-slate-400 flex-shrink-0">{formatDate(review.createdAt)}</span>
        </div>
        <StarRating rating={review.rating} size="sm" showValue={false} className="mt-1" />
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">{review.comment}</p>
      </div>
    </div>
  </div>
);
