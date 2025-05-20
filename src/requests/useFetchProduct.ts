import useSWR from 'swr';
import productService from '@/services/product.service';

function useFetchProduct(name:string, current_page:number) {
  const { data, error, isLoading } = useSWR(
    'fetch_product',
    async () => await productService.fetchProduct(name, current_page)
  );
  return { data, error, isLoading };
}

export default useFetchProduct;
