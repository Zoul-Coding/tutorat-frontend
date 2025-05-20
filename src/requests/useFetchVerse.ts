import useSWR from 'swr';
import versetService from '@/services/verset.service';

function useFetchVerse() {
  const { data, error, isLoading } = useSWR(
    'fetch_verse',
    async () => await versetService.fetchVerse()
  );
  return { data, error, isLoading };
}

export default  useFetchVerse;