"use client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Plus, Minus, Trash2, BrushCleaning, MoveLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { InfiniteData } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/components/shared/product-card";

type GuestCartItem = {
  product: string;
  quantity: number;
};

type ProductsPage = {
  products: any[];
  nextPage?: number;
};

export default function CartGuestData() {
  const [cartItems, setCartItems] = useState<GuestCartItem[]>([]);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  // translations
  const t = useTranslations("cart");
  const tBestSelling = useTranslations("best-selling");
  const PAGE_SIZE = 2;

  // deal with best selling products
  const { data: bestSellingData, isLoading: isBestSellingLoading } = useQuery({
    queryKey: ["best-selling-products"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/products?sort=-sold&limit=6`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

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

  if (cartItems.length > 0 && isLoading) return <div>Loading...</div>;
  if (cartItems.length > 0 && isError) return <div>Error loading products</div>;

  return (
    <>
      <div className="px-20">
        {cartItems.length === 0 ? (
          /* in case cart empty or after clear cart */
          <div className="w-[48rem] my-10 px-4 py-2 rounded-[1rem]">
            <div className="cart-header flex justify-between items-center mb-4 w-full">
              <div className="text-5xl text-zinc-800 font-bold">
                {t("title")}
                <span className="text-zinc-500 font-normal text-base ms-2">
                  {cartItems.length} {t("products")}
                </span>
              </div>
              <div className="clear">
                <Button disabled className="capitalize">
                  <BrushCleaning size={20} /> {t("empty")}
                </Button>
              </div>
            </div>
            <Card className="w-full">
              <CardContent>
                <Image
                  src="/assets/p0.png"
                  alt="No products"
                  width={250}
                  height={214}
                  className="mx-auto"
                />
                <p className="text-sm font-normal text-zinc-400">
                  {t("empty-cart")}
                </p>
              </CardContent>
            </Card>
            <div className="text-start py-6 w-full">
              <Button variant="destructive" className="capitalize">
                <MoveLeft size={20} />
                <Link href="/">{t("continue-shopping")}</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-[48rem]">
            {/* cart header */}
            <div className="cart-header flex justify-between items-center mb-4 w-full">
              <div className="text-5xl text-zinc-800 font-bold">
                {t("title")}
                <span className="text-zinc-500 font-normal text-base ms-2">
                  {cartItems.length} {t("products")}
                </span>
              </div>
              <Button
                variant="light"
                onClick={clearCart}
                className="capitalize"
              >
                <BrushCleaning size={20} /> {t("empty")}
              </Button>
            </div>
            {/* cart body */}
            <Card className="w-full">
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
                          {/* cart item image */}
                          <img
                            src={product.imgCover}
                            alt={product.title}
                            width={100}
                            className="rounded h-32 object-cover"
                          />
                          <div className="flex flex-col justify-between items-start h-32 ">
                            {/* cart item title and rating */}
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

                            {/* cart item quantity and price */}
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

                        {/* remove item  */}
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

                          {/* decrease quantity */}
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

                            {/* input value */}
                            <Input
                              type="number"
                              value={cartItem?.quantity ?? 1}
                              className="w-24 text-center p-4 border border-zinc-300 rounded-[1rem]"
                              readOnly
                            />

                            {/* increase quantity */}
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

                {/* loading on scroll */}
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

            {/* continue shopping button */}
            <div className="text-start py-6 w-full">
              <Button variant="destructive" className="capitalize">
                <MoveLeft size={20} />
                <Link href="/">{t("continue-shopping")}</Link>
              </Button>
            </div>
          </div>
        )}

        {/* Best Selling carousel */}
        <section className="flex w-full md:w-[80rem] mx-auto flex-col gap-8 mt-10 mb-40 pt-8 ">
          <h2 className="text-lg font-semibold text-start  uppercase mb-3 text-softPink-500">
            {tBestSelling("title")}
          </h2>
          {isBestSellingLoading ? (
            <div className="grid grid-cols-3 gap-4 animate-pulse">
              <div className="h-72 w-full rounded-md bg-zinc-200" />
              <div className="h-72 w-full rounded-md bg-zinc-200" />
              <div className="h-72 w-full rounded-md bg-zinc-200" />
            </div>
          ) : bestSellingData?.products?.length ? (
            <Carousel opts={{ align: "start" }} className="w-full h-full">
              <CarouselContent className="ml-0 h-full flex">
                {bestSellingData.products.map((product: any) => (
                  <CarouselItem
                    key={product._id}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <ProductCard
                      id={product._id}
                      img={product.imgCover}
                      title={product.title}
                      price={product.price}
                      priceAfterDiscount={product.priceAfterDiscount}
                      quantity={product.quantity}
                      sold={product.sold}
                      rateAvg={product.rateAvg}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="bg-maroon-600 absolute text-white hover:bg-maroon-700 hover:text-white top-40 -left-0" />
              <CarouselNext className="bg-maroon-600 absolute text-white hover:bg-maroon-700 hover:text-white top-40 -right-3" />
            </Carousel>
          ) : null}
        </section>
      </div>
    </>
  );
}
