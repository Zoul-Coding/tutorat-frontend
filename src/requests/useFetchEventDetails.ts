import useSWR from 'swr';
import eventService from '@/services/event.service';

function useFetchEventDetails(slug:any) {
  const { data, error, isLoading } = useSWR(
    'fetch_event_details',
    async () => await eventService.fetchEventDetails(slug)
  );
  return { data, error, isLoading };
}

export default useFetchEventDetails;
