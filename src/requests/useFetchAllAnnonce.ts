import useSWR from 'swr';
import annonceService from '@/services/annonce.service';

function useFetchAllAnnonce() {
  const { data, error, isLoading } = useSWR('fetch_all_annonce',
    async () => await annonceService.getAllAnnonce()
  );

  return { data, error, isLoading };
}

export default useFetchAllAnnonce;
