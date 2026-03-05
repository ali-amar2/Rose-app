import { OccasionsResponse } from "../types/occasion";

export async function getOccasionsService(
  params: Record<string, string> = {}
): Promise<OccasionsResponse> {
  const queryString = new URLSearchParams(params).toString();
  const res = await fetch(`/api/occasions?${queryString}`);

<<<<<<< HEAD
  if (!res.ok) throw new Error("Failed to fetch occasions from local API");
=======
  if (!res.ok) throw new Error("Failed to fetch occasions");
>>>>>>> d4af36935778edf96524dcb3040e30d551751b12
  return res.json();
}
