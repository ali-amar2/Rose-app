"use server";

import { getToken } from "@/lib/utils/manage-token";

// delete product action
export async function deleteProductAction(productId: string): Promise<void> {
  const token = await getToken();
  if (!token?.accesstoken) throw new Error("Unauthorized");

  const res = await fetch(`${process.env.API}/products/${productId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token.accesstoken}` },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${res.status}: ${body}`);
  }
}
