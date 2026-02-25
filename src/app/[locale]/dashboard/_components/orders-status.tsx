"use client";

import { OrdersPieChart } from "./orders-pie-chart";

import { useGetOrdersStatistics } from "../_hooks/useGetOrdersStatistics";

export default function OrdersStatus() {
  const { orders } = useGetOrdersStatistics();

  const status = orders?.statistics.ordersByStatus || [];
  return (
    <div className="w-[17.3rem] h-96 mx-auto my-5 ">
      <OrdersPieChart status={status} />
    </div>
  );
}
