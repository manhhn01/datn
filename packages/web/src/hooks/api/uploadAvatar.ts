import { api } from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";

export const useUploadAvatar = () => {
  return useMutation({
    mutationFn: async (form: FormData) => {
      return api.post("/me/avatar", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });
}
