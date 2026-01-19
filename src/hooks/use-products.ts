"use client";
import { useQuery } from "@tanstack/react-query";

export function useProducts(params?: Record<string, any>) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      const query = new URLSearchParams();

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            query.append(key, value.toString());
          }
        });
      }

      const res = await fetch(`/api/products?${query.toString()}`);

      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
    staleTime: 5 * 60 * 1000,
  });
}
