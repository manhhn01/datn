import { api } from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";

export const useLogout = () => {
  return useMutation({
    mutationFn: () => {
      return api.post("/auth/logout");
    },
  });
}
