import useSWR from 'swr';
import blogService from '@/services/blog.service';

function useFetchResponseComment(id:number) {
  const { data, error, isLoading } = useSWR(
    'fetch_response_comment',
    async () => await blogService.fetchResponseComment(id)
  );
  return { data, error, isLoading };
}

export default useFetchResponseComment;
