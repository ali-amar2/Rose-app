import { getOrders } from "@/lib/services/orders.service";
import { useQuery } from "@tanstack/react-query";

export function useOrders() {
  return useQuery<OrdersResponse>({
    queryKey: ["orders"],
    queryFn: getOrders,
    retry: false,
  });
}
