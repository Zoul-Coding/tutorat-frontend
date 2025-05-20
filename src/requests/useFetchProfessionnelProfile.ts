import useSWR from 'swr';
import professionnelService from '@/services/professionnel.service';

function useFetchProfessionnelProfile(current_page: number) {
  const { data, error, isLoading } = useSWR(
    'fetch_professionnel_profile',
    async () => await professionnelService.fetchProfessionnelleProfile(current_page)
  );
  return { data, error, isLoading };
}

export default useFetchProfessionnelProfile;
