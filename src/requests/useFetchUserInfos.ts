import useSWR from 'swr';
import userService from '@/services/user.service';

function useFetchInfoUser() {
  const { data, error, isLoading, mutate } = useSWR('fetch_info_user',
    async () => await userService.userInfos()
  );

  return { data, error, isLoading };
}

export default useFetchInfoUser;
