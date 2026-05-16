// "use server";

// import { getToken } from "@/lib/utils/manage-token";

// export async function addWishlistAction(productId: string) {
//   const token = await getToken();

//   const accessToken = token?.accessToken;

//   if (!accessToken) {
//     throw new Error("Unauthorized");
//   }

//   const res = await fetch(`${process.env.API}/wishlist/add`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${accessToken}`,
//     },
//     body: JSON.stringify({ productId }),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data?.message || "Failed to add wishlist");
//   }
//   console.log(data);

//   return data;
// }

// export async function removeWishlistAction(productId: string) {
//   const token = await getToken();

//   const accessToken = token?.accessToken;

//   if (!accessToken) {
//     throw new Error("Unauthorized");
//   }

//   const res = await fetch(`${process.env.API}/wishlist/${productId}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data?.message || "Failed to remove wishlist");
//   }

//   return data;
// }
