import { api } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";

export const useDetailJob = (id: string) => {
  return useQuery({
    queryKey: ['/jobs', id],
    queryFn: async () => {
      const { data } = await api.get(`/jobs/${id}`);

      return data.data.result || {};
    },
  });
}
