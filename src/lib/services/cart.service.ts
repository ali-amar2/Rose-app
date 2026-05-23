import type { CartErrorResponse, CartResponse } from "@/lib/types/cart";

export async function getCartService(): Promise<CartResponse> {
  const response = await fetch("/api/cart", {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: CartResponse | CartErrorResponse = await response.json();

  if (!response.ok) {
    throw new Error("error" in data ? data.error : "Failed to fetch cart");
  }

  return data as CartResponse;
}
