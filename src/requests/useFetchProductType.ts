import useSWR from 'swr';
import productService from '@/services/product.service';

function useFetchProductType(name:string) {
  const { data, error, isLoading } = useSWR(
    'fetch_product_type',
    async () => await productService.fetchProductType(name)
  );
  return { data, error, isLoading };
}

export default useFetchProductType;
