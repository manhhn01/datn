import { api } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

export const useListSkill = () => {
  return useQuery({
    queryKey: ['/skills'],
    queryFn: async () => {
      const { data } = await api.get('/skills');

      return data.data.result || [];
    },
  });
};
