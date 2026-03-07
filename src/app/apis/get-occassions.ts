import { OccasionsResponse } from "@/lib/types/occasion";

export async function getOccasions(): Promise<OccasionsResponse> {
  const res = await fetch(`/api/occasions`);

  if (!res.ok) {
    throw new Error("Failed to fetch occasions from API route");
  }

  return res.json();
}
