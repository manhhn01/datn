import { api } from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  type: 'EMPLOYER' | 'CANDIDATE';
}

export const useRegister = () => {
  return useMutation({
    mutationFn: ({
      firstName,
      lastName,
      phone,
      email,
      password,
      type,
    }: RegisterPayload) => {
      return api.post('/auth/register', {
        first_name: firstName,
        last_name: lastName,
        phone,
        email,
        password,
        type,
      });
    },
  });
};
