import { Review } from "@/lib/types/review";

export async function getAllReviews(): Promise<{ reviews: Review[] }> {
  const res = await fetch(`${process.env.API}/reviews`, { cache: "no-store" });

  if (!res.ok) throw new Error("Failed to fetch reviews");

  return res.json();
}

// Creates a new product review
export async function createReview(
  token: string,
  payload: {
    product: string;
    rating: number;
    title: string;
    comment: string;
  }
) {
  const res = await fetch(`${process.env.API}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.error ?? data?.message ?? "Failed to create review");
  }

  return res.json();
}
