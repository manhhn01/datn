import { api } from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

export const useListCandidateResume = (isSelfCreated?: boolean) => {
  return useQuery({
    queryKey: ['candidates/resume', !!isSelfCreated],
    queryFn: async () => {
      const { data } = await api.get('/candidates/resume', {
        params: {
          selfCreated: isSelfCreated,
        }
      });
      return data.data.result;
    },
  });
};
