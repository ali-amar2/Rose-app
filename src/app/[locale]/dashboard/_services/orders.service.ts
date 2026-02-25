import { DashboardStatisticsResponse } from "@/lib/types/dashboard/orders";

export async function getOrdersStatisticsService(): Promise<DashboardStatisticsResponse> {
  const res = await fetch("/api/dashboard/orders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to Get Orders Statistics");

  return res.json();
}
