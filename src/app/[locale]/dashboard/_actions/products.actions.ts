"use server";

import { getMyToken } from "@/lib/utils/get-my-token";
import { GetProductsResponse } from "@/lib/types/dashboard/product.d";

// helpers
async function getAccessToken(): Promise<string> {
  const token = await getMyToken();
  if (!token?.accesstoken) throw new Error("Unauthorized");
  return token.accesstoken as string;
}

// actions
export async function getProductsAction(
  page: number = 1,
  limit: number = 12
): Promise<GetProductsResponse> {
  // get access token
  const token = await getAccessToken();

  // fetch products
  const res = await fetch(
    `${process.env.API}/products?page=${page}&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    }
  );

  // check if request was successful
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

// delete product
export async function deleteProductAction(productId: string): Promise<void> {
  // get access token
  const token = await getAccessToken();

  const res = await fetch(`${process.env.API}/products/${productId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  // check if request was successful
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${res.status}: ${body}`);
  }
}
