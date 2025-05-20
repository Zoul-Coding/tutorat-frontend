import useSWR from 'swr';
import eventService from '@/services/event.service';

function useFetchEvent() {
  const { data, error, isLoading } = useSWR(
    'fetch_event',
    async () => await eventService.fetchEvent()
  );
  return { data, error, isLoading };
}

export default  useFetchEvent;