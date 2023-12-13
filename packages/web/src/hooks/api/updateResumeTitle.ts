import { api } from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';

export const useUpdateResumeTitle = () => {
  return useMutation({
    mutationFn: async (params: { id: string; title: string }) => {
      const { data } = await api.post(`/candidates/resume/${params.id}/title`, {
        title: params.title,
      });
      return data.data.result;
    },
  });
};
