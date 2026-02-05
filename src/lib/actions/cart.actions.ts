"use server";

import { AddToCartItem, CartResponse } from "../types/cart";
import { getToken } from "../utils/manage-token";

export async function addToCartAction(item: AddToCartItem) {
  const tokenObj = await getToken();
  const token = tokenObj?.accesstoken;

  // const loggedIn = await isLogged();

  // if (loggedIn) {
  const res = await fetch(`${process.env.API}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(item),
  });

  if (!res.ok) {
    const err = await res.text();
    // console.error("AddToCart API Error:", err);
    throw new Error(err);
  }

  const cart: CartResponse = await res.json();
  return cart;
  // } else {
  //   guestAddToCart(item);
  // }
}
