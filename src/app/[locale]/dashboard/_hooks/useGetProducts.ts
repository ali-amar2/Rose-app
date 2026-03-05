"use client";
import { useQuery } from "@tanstack/react-query";
import { getProductsAction } from "../_actions/products.actions";
import { GetProductsResponse } from "@/lib/types/dashboard/product.d";

export function useGetProducts(page: number = 1, limit: number = 12) {
  // Queries
  return useQuery<GetProductsResponse>({
    queryKey: ["dashboard-products", page, limit],
    queryFn: () => getProductsAction(page, limit),
    staleTime: 1000 * 30, // 30s cache
  });
}