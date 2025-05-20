import useSWR from 'swr';
import blogService from '@/services/blog.service';

function useFetchCategoryArticle() {
  const { data, error, isLoading } = useSWR(
    'fetch_category_article',
    async () => await blogService.fetchCategoryArticle()
  );
  return { data, error, isLoading };
}

export default useFetchCategoryArticle;