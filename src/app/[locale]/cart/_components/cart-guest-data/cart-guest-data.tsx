"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Plus, Minus, Trash2, BrushCleaning, MoveLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { InfiniteData } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";

type GuestCartItem = {
  product: string;
  quantity: number;
};

type ProductsPage = {
  products: any[];
  nextPage?: number;
};

const PAGE_SIZE = 2;

export default function CartGuestData() {
  const [cartItems, setCartItems] = useState<GuestCartItem[]>([]);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const t = useTranslations("cart");

  // fetch products details for guest cart items
  async function fetchProducts({ pageParam = 0 }: { pageParam: number }) {
    const start = pageParam * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    const pageIds = ids.slice(start, end);

    // use promise.all to fetch all products in parallel
    const results = await Promise.all(
      pageIds.map(async (id) => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API}/products/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        return data.product;
      })
    );

    return {
      products: results,
      nextPage: end < ids.length ? pageParam + 1 : undefined,
    };
  }

  // clear cart
  function clearCart() {
    localStorage.removeItem("guest-cart");
    setCartItems([]);
  }

  // increase quantity
  const increaseQuantity = (id: string) => {
    setCartItems((prev) => {
      const updated = prev.map((item) =>
        item.product === id
          ? { ...item, quantity: (item.quantity ?? 1) + 1 }
          : item
      );
      localStorage.setItem("guest-cart", JSON.stringify(updated));
      return updated;
    });
  };

  // decrease quantity
  const decreaseQuantity = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product === id
          ? { ...item, quantity: Math.max((item.quantity ?? 1) - 1, 1) }
          : item
      )
    );
  };

  // remove product
  const removeProduct = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.product !== id));
  };

  // get data from lcoastorage and check it no data
  useEffect(() => {
    const stored = localStorage.getItem("guest-cart");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  // get product by id
  const ids = cartItems.map((item) => item.product);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery<
    ProductsPage,
    Error,
    InfiniteData<ProductsPage>,
    (string | string[])[],
    number
  >({
    queryKey: ["guest-cart-products", ids],
    queryFn: ({ pageParam }) => fetchProducts({ pageParam }),
    initialPageParam: 0,
    enabled: ids.length > 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  useEffect(() => {
    if (!loadMoreRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products</div>;

  return (
    <>
      <div className="flex justify-between px-20 gap-10">
        <div className="card w-[48rem]">
          <div className="cart-header flex justify-between items-center mb-4">
            <div className="text-5xl text-zinc-800 font-bold">
              {t("title")}
              <span className="text-zinc-500 font-normal text-base ms-2">
                {cartItems.length} {t("products")}
              </span>
            </div>
            <Button variant="light" onClick={clearCart} className="capitalize">
              <BrushCleaning size={20} /> {t("empty")}
            </Button>
          </div>

          <Card>
            <CardContent className="max-h-[32rem] overflow-y-auto hide-scrollbar">
              {data?.pages.map((page) =>
                page.products.map((product: any) => {
                  const cartItem = cartItems.find(
                    (item) => item.product === product._id
                  );

                  return (
                    <div
                      key={product._id}
                      className="flex justify-between items-center border-b py-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={product.imgCover}
                          alt={product.title}
                          width={100}
                          className="rounded h-32 object-cover"
                        />
                        <div className="flex flex-col justify-between items-start h-32 ">
                          <div>
                            <p className="font-semibold text-lg text-start  text-maroon-600 capitalize pb-2">
                              {product.title}
                            </p>
                            <div className="font-normal text-start text-base">
                              ⭐{t("rating")}:
                              <span className="font-medium">
                                {product.rateAvg}
                              </span>
                              <span className="text-blue-600 font-medium text-base ms-2">
                                ({product.rateCount} {t("ratings")})
                              </span>
                            </div>
                          </div>

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

                      <div className="flex flex-col justify-between items-end h-32">
                        <Button
                          variant="destructive"
                          className="capitalize "
                          onClick={() =>
                            cartItem && removeProduct(cartItem?.product)
                          }
                        >
                          <Trash2 /> {t("remove-product")}
                        </Button>

                        <div className="flex items-center gap-2 ">
                          <Button
                            variant="secondary"
                            onClick={() =>
                              cartItem && decreaseQuantity(cartItem?.product)
                            }
                            disabled={(cartItem?.quantity ?? 1) <= 1}
                          >
                            <Minus size={20} />
                          </Button>
                          <Input
                            type="number"
                            value={cartItem?.quantity ?? 1}
                            className="w-24 text-center p-4 border border-zinc-300 rounded-[1rem]"
                            readOnly
                          />
                          <Button
                            variant="secondary"
                            onClick={() =>
                              cartItem && increaseQuantity(cartItem?.product)
                            }
                          >
                            <Plus size={20} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}

              {hasNextPage && (
                <div
                  ref={loadMoreRef}
                  className="text-start py-6  text-zinc-500"
                >
                  {isFetchingNextPage ? "Loading..." : ""}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="text-start py-6">
            <Button variant="destructive" className="capitalize">
              <MoveLeft size={20} />
              <Link href="/">{t("continue-shopping")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
