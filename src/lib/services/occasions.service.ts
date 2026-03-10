import { OccasionsResponse } from "../types/occasion";

export async function getOccasionsService(
  params: Record<string, string> = {}
): Promise<OccasionsResponse> {
  const queryString = new URLSearchParams(params).toString();
  const res = await fetch(`/api/occasions?${queryString}`);

  if (!res.ok) throw new Error("Failed to fetch occasions");
  return res.json();
}
