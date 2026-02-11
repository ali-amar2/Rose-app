"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Minus } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import NoProduct from "../../../../../../public/assets/p0.png";
// import Image from "next/image";

type GuestCartItem = {
  product: string;
  quantity: number;
};

export default function CartGuestData() {
  const [cartItems, setCartItems] = useState<GuestCartItem[]>([]);

  //   fetch products details for guest cart items and use promise.all to fetch all products in parallel
  async function fetchProducts(ids: string[]) {
    const results = await Promise.all(
      ids.map(async (id) => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/products/${id}`
        );
        if (!res.ok) throw new Error(`Failed to fetch product ${id}`);
        const data = await res.json();
        console.log("Fetched product data:", data);
        return data.product;
      })
    );
    return results;
  }

  useEffect(() => {
    const stored = localStorage.getItem("guest-cart");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  const ids = cartItems.map((item) => item.product);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["guest-cart-products", ids],
    queryFn: () => fetchProducts(ids),
    enabled: ids.length > 0,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  return (
    <div>
      <h2>Guest Cart</h2>

      {/* this image need to work  */}
      {/* <Image
        src="/assets/p0.png"
        alt="No products"
        width={800}
        height={800}
        className="mx-auto my-20"
      /> */}
      <div className=" mt-48 w-3/4 ">
        <div className="cart-header flex justify-between items-center mb-4">
          <div> cart 0 </div>
          <div className="clear">
            <Button variant={"outline"}> Clear Cart </Button>
          </div>
        </div>

        <Card>
          <CardContent>
            {data?.map((product: any) => {
              const cartItem = cartItems.find(
                (item) => item.product === product._id
              );

              return (
                <div
                  key={product._id}
                  className="flex justify-between items-center border-b py-4"
                >
                  {/*  product info */}

                  <div className="flex items-center gap-4">
                    <img
                      src={product.imgCover}
                      alt={product.title}
                      width={100}
                      className="rounded h-32 object-cover"
                    />
                    <div className="flex flex-col justify-between h-32">
                      {/* rating */}
                      <div className="rating ">
                        <p className="font-semibold text-lg text-maroon-600 capitalize pb-2">
                          {product.title}
                        </p>
                        <p className="font-normal text-base">
                          ⭐ Rating:
                          <span className="font-medium">
                            {" "}
                            {product.rateAvg}{" "}
                          </span>
                          <span className="text-blue-600 font-medium text-base lowercase ms-2">
                            ({product.rateCount} ratings)
                          </span>
                        </p>
                      </div>

                      {/* total price */}
                      <div className="total-price">
                        <p>
                          <span className="text-maroon-600 text-sm font-medium me-1">
                            (x{cartItem?.quantity})
                          </span>
                          <span className="font-bold text-2xl">
                            {product.price * (cartItem?.quantity ?? 1)} EGP
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/*   quantity */}
                  <div className="flex flex-col justify-between h-32">
                    <div className="removeItme">
                      <Button variant={"destructive"}>
                        <Trash2 /> Remove
                      </Button>
                    </div>
                    <div className="quantity flex items-center gap-2">
                      <Button
                        variant={"secondary"}
                        className="px-4 py-2  rounded"
                      >
                        <Minus size={20} />
                      </Button>
                      <input
                        type="number"
                        value={cartItem?.quantity ?? 1}
                        readOnly
                        className="w-12 text-center border rounded"
                      />
                      <Button
                        variant={"secondary"}
                        className="px-4 py-2  rounded"
                      >
                        <Plus size={20} />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
