import useSWR from 'swr';
import reviewService from '@/services/review.service';

function useFetchReview() {
  const { data, error, isLoading } = useSWR(
    'fetch_review_prorr',
    async () => await reviewService.fetchReview()
  );
  return { data, error, isLoading };
}

export default  useFetchReview;