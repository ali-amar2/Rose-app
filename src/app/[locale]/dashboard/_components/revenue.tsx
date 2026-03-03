"use client";
import { RevenueChart } from "./revenue-chart";
import { useGetOrdersStatistics } from "../_hooks/useGetOrdersStatistics";

export default function Revenue() {
  const { orders } = useGetOrdersStatistics();

  return (
    <div className="w-3/4">
      <RevenueChart data={orders?.statistics.monthlyRevenue} />
    </div>
  );
}
