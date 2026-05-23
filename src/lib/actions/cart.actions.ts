"use server";

import {
  AddToCartPayload,
  CartErrorResponse,
  CartResponse,
} from "../types/cart";
import { getToken } from "../utils/manage-token";

export async function addToCartAction(
  payload: AddToCartPayload
): Promise<CartResponse | CartErrorResponse> {
  const token = await getToken();

  if (!token?.accessToken) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`${process.env.API}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.accessToken}`,
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const data: CartResponse | CartErrorResponse = await response.json();

  if (!response.ok) {
    throw new Error(
      "error" in data ? data.error : "Failed to add product to cart"
    );
  }

  return data;
}
