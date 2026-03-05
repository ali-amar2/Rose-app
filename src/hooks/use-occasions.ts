import { useQuery } from "@tanstack/react-query";
import { OccasionsResponse } from "@/lib/types/occasion";
import { getOccasionsService } from "@/lib/services/occasions.service";

export function useOccasions(params: Record<string, string> = {}) {
  return useQuery<OccasionsResponse>({
    queryKey: ["occasions", params],
    queryFn: () => getOccasionsService(params),
  });
}
