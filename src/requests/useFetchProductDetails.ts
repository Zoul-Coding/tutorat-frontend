import useSWR from 'swr';
import productService from '@/services/product.service';

function useFetchProductDetails(slug:any) {
  const { data, error, isLoading } = useSWR(
    slug ? `fetch_product_details_${slug}` : null,
    async () => await productService.fetchProductDetails(slug)
  );
  return { data, error, isLoading };
}

export default useFetchProductDetails;
