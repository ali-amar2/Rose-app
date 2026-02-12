// {to use products you may like i'll use api Get Personalized Recommendations in realted products}

"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CartGuestData from "../cart-guest-data/cart-guest-data";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { BrushCleaning } from "lucide-react";
import { MoveLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";


export default function CartData() {
  const { status } = useSession();
  const [guestCart, setGuestCart] = useState<any[]>([]);
  const t = useTranslations("cart");

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
          <div className="w-[50rem] mx-auto my-10 px-4 py-2 rounded-[1rem]">
            <div className="cart-header  flex justify-between items-center mb-4">
              <div className="text-5xl text-zinc-800 font-bold ">
                {t("title")}
                <span className="text-zinc-500 font-normal text-base ms-2">
                  {guestCart.length} {t("products")}
                </span>
              </div>
              <div className="clear">
                <Button disabled className="capitalize">
                  <BrushCleaning size={20} /> {t("empty")}
                </Button>
              </div>
            </div>
            <Card>
              <CardContent>
                <Image
                  src="/assets/p0.png"
                  alt="No products"
                  width={250}
                  height={214}
                  className="mx-auto "
                />
                <p className="text-sm font-normal text-zinc-400 ">
                  {t("empty-cart")}
                </p>
              </CardContent>
            </Card>
            <div className=" text-start py-6">
              <Button variant={"destructive"} className="capitalize">
                <MoveLeft size={20} />
                <Link href="/">{t("continue-shopping")}</Link>
              </Button>
            </div>
          </div>
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
