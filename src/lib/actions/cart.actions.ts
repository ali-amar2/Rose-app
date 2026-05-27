"use server";

import {
  AddToCartPayload,
  CartErrorResponse,
  CartResponse,
  ClearCartResponse,
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

export async function clearCartAction(): Promise<
  ClearCartResponse | CartErrorResponse
> {
  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`${process.env.API}/cart`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.accessToken}`,
    },
    cache: "no-store",
  });

  const data: ClearCartResponse | CartErrorResponse = await response.json();

  if (!response.ok) {
    throw new Error("error" in data ? data.error : "Failed to clear cart");
  }
  console.log(data);

  return data;
}

export async function removeCartItemAction(
  productId: string
): Promise<CartResponse | CartErrorResponse> {
  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`${process.env.API}/cart/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.accessToken}`,
    },
    cache: "no-store",
  });

  const data: CartResponse | CartErrorResponse = await response.json();

  if (!response.ok) {
    throw new Error(
      "error" in data ? data.error : "Failed to remove cart item"
    );
  }

  return data;
}

export async function updateCartItemQuantityAction(
  productId: string,
  quantity: number
): Promise<CartResponse | CartErrorResponse> {
  const token = await getToken();

  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await fetch(`${process.env.API}/cart/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.accessToken}`,
    },
    body: JSON.stringify({
      quantity,
    }),
    cache: "no-store",
  });

  const data: CartResponse | CartErrorResponse = await response.json();

  if (!response.ok) {
    throw new Error(
      "error" in data ? data.error : "Failed to update cart quantity"
    );
  }

  return data;
}
