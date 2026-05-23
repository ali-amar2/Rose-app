"use client";

import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getCartService } from "@/lib/services/cart.service";

export function useGetCart() {
  const { data: session, status } = useSession();

  const userId = status === "authenticated" ? session?.user?._id : "guest";

  const query = useQuery({
    queryKey: ["cart", userId],
    queryFn: getCartService,
    enabled: status === "authenticated",
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });

  return {
    cart: query.data,
    isPending: status === "loading" || query.isPending,
    isError: query.isError,
    error: query.error,
  };
}
