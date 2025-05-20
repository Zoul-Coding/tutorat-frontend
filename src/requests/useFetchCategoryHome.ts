import useSWR from 'swr';
import categoryService from '@/services/category.service';

function useFetchCategoryHome() {
  const { data, error, isLoading } = useSWR(
    'fetch_category_home',
    async () => await categoryService.fetchCategoryHome()
  );
  return { data, error, isLoading };
}

export default useFetchCategoryHome;
