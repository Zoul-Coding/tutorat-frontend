import useSWR from 'swr';
import annonceService from '@/services/annonce.service';

function useFetchUserAnnonce() {
  const { data, error, isLoading, mutate } = useSWR('fetch_user_annonce',
    async () => await annonceService.getUserAnnonce()
  );

  return { data, error, isLoading };
}

export default useFetchUserAnnonce;
