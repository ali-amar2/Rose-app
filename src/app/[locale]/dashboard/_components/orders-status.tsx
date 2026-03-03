"use client";

import { OrdersPieChart } from "./orders-pie-chart";
import { useGetOrdersStatistics } from "../_hooks/useGetOrdersStatistics";

export default function OrdersStatus() {
  const { orders } = useGetOrdersStatistics();

  const status = orders?.statistics.ordersByStatus || [];
  return (
    <div className="w-1/4">
      <OrdersPieChart status={status} />
    </div>
  );
}
