import { api } from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";

export interface LoginPayload {
  email: string;
  password: string;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: LoginPayload) => {
      return api.post("/auth/login", { email, password });
    },
  });
};
