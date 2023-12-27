import { api } from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';

export const useBookmarkJob = () => {
  return useMutation({
    mutationFn: async (params: { id: string }) => {
      const { data } = await api.post(`/jobs/${params.id}/bookmark`);

      return data.data.result;
    },
  });
};
