import useSWR from 'swr';
import blogService from '@/services/blog.service';

function useFetchArticleDetails(slug:any) {
  const { data, error, isLoading } = useSWR(
    'fetch_article_details',
    async () => await blogService.fetchArticleDetails(slug)
  );
  return { data, error, isLoading };
}

export default useFetchArticleDetails;
