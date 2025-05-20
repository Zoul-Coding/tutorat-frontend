import useSWR from 'swr';
import productService from '@/services/product.service';

function useFetchAllOffers(current_page:number) {
  const { data, error, isLoading } = useSWR(
    'fetch_all_offers',
    async () => await productService.fetchAllProduct(current_page)
  );
  return { data, error, isLoading };
}

export default useFetchAllOffers;
