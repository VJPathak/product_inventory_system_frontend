import { useQuery } from '@tanstack/react-query';
import { categoryApi } from '@/services/api';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getAll(),
    staleTime: 5 * 60 * 1000, // Categories don't change often
  });
};
