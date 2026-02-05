// components/SyncGuestCart.tsx
"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { AddToCartItem } from "@/lib/types/cart";
import { addToCartAction } from "@/lib/actions/cart.actions";

export default function SyncGuestCart() {
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      const guestCart: AddToCartItem[] = JSON.parse(
        localStorage.getItem("guest-cart") || "[]"
      );

      if (guestCart.length > 0) {
        guestCart.forEach(async (item) => {
          try {
            await addToCartAction(item); // send to server
          } catch (err) {
            console.error("Error syncing guest cart:", err);
          }
        });
        localStorage.removeItem("guest-cart");
      }
    }
  }, [status]);

  return null; // invisible component
}
