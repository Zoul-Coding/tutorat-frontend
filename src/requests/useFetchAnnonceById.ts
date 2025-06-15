import useSWR from 'swr';
import annonceService from '@/services/annonce.service';

function useFetchAnnonceById(id: string | null) {
  const shouldFetch = typeof id === "string" && id.trim() !== "";

  const { data, error, isLoading } = useSWR(
    shouldFetch ? [`fetch_annonce_by_id`, id] : null,
    () => annonceService.getAnnonceById(id!)
  );

  return { data, error, isLoading };
}


export default useFetchAnnonceById;
