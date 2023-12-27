import { api } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

export const useListBookmark = () => {
  return useQuery({
    queryKey: ['candidates/bookmark'],
    queryFn: async () => {
      const { data } = await api.get('/candidates/bookmarks');

      return data.data.result;
    },
  });
};
