import { Review } from "@/lib/types/review";

// API
const API = process.env.API!;

// Fetches all reviews from the API
export async function getAllReviews(): Promise<{
  reviews: Review[];
}> {
  const res = await fetch(`${API}/reviews`, {
    cache: "no-store",
  });

  // Throw an error if the response is not OK
  if (!res.ok) {
    throw new Error("Failed to fetch reviews");
  }

  return res.json();
}

// Creates a new product review
export async function createReview(
  // types
  token: string,
  payload: {
    product: string;
    rating: number;
    title: string;
    comment: string;
  }
) {
  // Fetch
  const res = await fetch(`${API}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  // Throw an error if the response is not OK
  if (!res.ok) throw new Error("Failed to create review");
  return res.json();
}
