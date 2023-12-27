import { api } from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';

export interface UpdateProfilePayload {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address?: string;
  skill: number[];
  looking_for_job?: boolean;
}

export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async (payload: Partial<UpdateProfilePayload>) => {
      return api.post('/me', payload);
    },
  });
};
