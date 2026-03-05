import { getCategories } from "@/lib/services/categories.service";
import { CategoriesResponse } from "@/lib/types/category";
import { useQuery } from "@tanstack/react-query";

export function useCategories(params: Record<string, any> = {}) {
  return useQuery<CategoriesResponse>({
    queryKey: ["categories", params],
    queryFn: () => getCategories(params),
  });
}
