import { api } from '@/utils/axios';
import { BaseQueryParams } from '@/utils/query';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export interface UseListJobQueryParams extends BaseQueryParams {
  keyword?: string | null;
  location?: string | null;
}

export interface UseListJobParams {
  params?: UseListJobQueryParams;
}

export const useListJob = ({ params }: UseListJobParams) => {
  return useQuery({
    queryKey: ['/jobs', params],
    queryFn: async () => {
      const { data } = await api.get('/jobs', {
        params,
      });

      return data.data.result || [];
    },
    placeholderData: keepPreviousData,
  });
};
