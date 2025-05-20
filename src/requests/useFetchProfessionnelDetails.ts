import useSWR from 'swr';
import professionnelService from '@/services/professionnel.service';

function useFetchProfessionnelDetails(slug:string) {
  const { data, error, isLoading } = useSWR(
    slug ? `fetch_professionnel_details_${slug}` : null,
    async () => await professionnelService.fetchProfessionnelDetails(slug)
  );
  return { data, error, isLoading };
}

export default useFetchProfessionnelDetails;
