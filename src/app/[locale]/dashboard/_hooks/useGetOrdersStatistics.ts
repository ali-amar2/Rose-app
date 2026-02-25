import { useQuery } from "@tanstack/react-query";
import { getOrdersStatisticsService } from "../_services/orders.service";

export function useGetOrdersStatistics() {
  const { data } = useQuery({
    queryKey: ["dashboard", "orders-statistics"],
    queryFn: getOrdersStatisticsService,
  });

  return { orders: data };
}
