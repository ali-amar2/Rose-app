"use client";

import { useQuery } from "@tanstack/react-query";
import { OccasionsResponse } from "@/lib/types/occasion";
import { getOccasions } from "@/app/apis/get-occassions";

export function useOccasions() {
  return useQuery<OccasionsResponse>({
    queryKey: ["occasions"],
    queryFn: getOccasions,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
