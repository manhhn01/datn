import { api } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

export const useAuthInfo = () => {
  return useQuery({
    queryKey: ['auth/me'],
    queryFn: async () => {
      try {
        const { data } = await api.get('/auth/me');
        return data.data;
      } catch (error) {
        return null;
      }
    },
    staleTime: 1000 * 60 * 60,
  });
};
