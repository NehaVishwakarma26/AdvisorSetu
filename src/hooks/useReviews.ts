import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsApi } from '@/lib/api/reviews';
import { Review } from '@/types';

export const useReviews = (advisorId: string) =>
  useQuery({
    queryKey: ['reviews', advisorId],
    queryFn: () => reviewsApi.getAdvisorReviews(advisorId),
    enabled: !!advisorId,
  });

export const useSubmitReview = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Review, 'id' | 'createdAt'>) => reviewsApi.submitReview(data),
    onSuccess: (_, variables) => qc.invalidateQueries({ queryKey: ['reviews', variables.advisorId] }),
  });
};
