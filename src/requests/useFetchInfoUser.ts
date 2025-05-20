import useSWR from 'swr';
import userService from '@/services/user.service';
import Cookies from "js-cookie";

function useFetchInfoUser() {
  const token = Cookies.get("access_token");
  const { data, error, isLoading, mutate } = useSWR(
    token ? 'fetch_info_user' : null,
    async () => await userService.fetchInfoUser()
  );

  return { data, error, isLoading };
}

export default useFetchInfoUser;
