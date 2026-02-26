"use client";
import React from "react";
import { RevenueChart } from "./revenue-chart";
import { useGetOrdersStatistics } from "../_hooks/useGetOrdersStatistics";

export default function Revenue() {
  const { orders } = useGetOrdersStatistics();

  return (
    <div className="w-[49.6rem] max-h-96 mx-auto my-52 ">
      {orders?.statistics?.monthlyRevenue && (
        <RevenueChart
          dailyRevenue={orders?.statistics?.dailyRevenue}
          monthlyRevenue={orders.statistics.monthlyRevenue}
        />
      )}
    </div>
  );
}
