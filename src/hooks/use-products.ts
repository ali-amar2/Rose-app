"use client";
import { useQuery } from "@tanstack/react-query";

export function useProducts(params?: ProductsParams) {
  return useQuery({
    queryKey: ["products", params?.occasion],
    queryFn: async () => {
      const query = new URLSearchParams();
      if (params?.limit) query.append("limit", params.limit.toString());
      if (params?.sort) query.append("sort", params.sort);
      if (params?.occasion) query.append("occasion", params.occasion);

      const res = await fetch(`/api/products?${query.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });
}
