import useSWR from 'swr';
import categoryService from '@/services/category.service';

function useFetchCategory() {
  const { data, error, isLoading } = useSWR(
    'fetch_category',
    async () => await categoryService.fetchCategory()
  );
  return { data, error, isLoading };
}

export default useFetchCategory;
