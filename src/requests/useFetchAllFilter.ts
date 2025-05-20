import useSWR from 'swr';
import categoryService from '@/services/category.service';

function useFetchAllFilter(slug:string) {
  const { data, error, isLoading } = useSWR(
    'fetch_filter',
    async () => await categoryService.fetchAllFiltreCategory(slug)
  );
  return { data, error, isLoading };
}

export default useFetchAllFilter;
