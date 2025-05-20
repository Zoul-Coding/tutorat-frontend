import useSWR from 'swr';
import blogService from '@/services/blog.service';

function useFetchArticle(current_page:number) {
  const { data, error, isLoading } = useSWR(
    'fetch_article',
    async () => await blogService.fetchArticle(current_page)
  );
  return { data, error, isLoading };
}

export default useFetchArticle;
