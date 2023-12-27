import { api } from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';

export const useUploadResume = () => {
  return useMutation({
    mutationFn: async (form: FormData) => {
      return api.post('candidates/resume', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
  });
};
