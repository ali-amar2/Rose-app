import { AllStatisticsResponse } from "@/lib/types/dashboard/product";

// Service to get all statistics
export async function getAllStatisticsService(): Promise<AllStatisticsResponse> {
  const res = await fetch("/api/dashboard/products", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  // Check if the request was successful
  if (!res.ok) throw new Error("Failed to Get Statistics");

  return res.json();
}
