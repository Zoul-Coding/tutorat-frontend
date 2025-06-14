import useSWR from 'swr';
import annonceService from '@/services/annonce.service';

function useFetchShowAnnonce(slug:string) {
  const { data, error, isLoading } = useSWR('fetch_show_annonce',
    async () => await annonceService.showAnnonce(slug)
  );

  return { data, error, isLoading };
}

export default useFetchShowAnnonce;
