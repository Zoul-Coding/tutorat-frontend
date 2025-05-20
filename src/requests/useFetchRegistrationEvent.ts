import useSWR from 'swr';
import eventService from '@/services/event.service';

function useFetchRegistrationEvent() {
  const { data, error, isLoading } = useSWR(
    'fetch_registration_event',
    async () => await eventService.fetchRegistrationEvent()
  );
  return { data, error, isLoading };
}

export default  useFetchRegistrationEvent;