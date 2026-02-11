// {to use products you may like i'll use api Get Personalized Recommendations in realted products}

"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CartGuestData from "../cart-guest-data/cart-guest-data";

export default function CartData() {
  const { status } = useSession();
  const [guestCart, setGuestCart] = useState<any[]>([]);

  // if user  guest →  read from localStorage
  useEffect(() => {
    if (status === "unauthenticated") {
      const cart = JSON.parse(localStorage.getItem("guest-cart") || "[]");
      setGuestCart(cart);
    }
  }, [status]);

  //   authenticated → fetch  from backend + merge with guest cart
  const { data, isLoading, error } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch("/api/cart");
      if (!res.ok) throw new Error("Failed to fetch cart");
      return res.json();
    },
    enabled: status === "authenticated", //  logged in
  });

  //   guest case
  if (status === "unauthenticated") {
    return (
      <div>
        {guestCart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          // <p> please login to see cart products </p>
          <CartGuestData />
        )}
      </div>
    );
  }

  //   user login
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading cart</p>;

  return (
    <>
      <div>
        <h2>User Cart (merged)</h2>
        <div>Number of items: {data?.numOfCartItems}</div>
        {data?.cart?.cartItems?.map((item: any) => (
          <div key={item._id} className="border p-2 my-2">
            <img
              src={item.product.imgCover}
              alt={item.product.title}
              width={100}
            />
            <h3>{item.product.title}</h3>
            <p>Price: {item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))}
      </div>
    </>
  );
}
