"use client";

import { useGetCart } from "@/hooks/use-get-cart";
import CartItemCard from "./cart-item-card";
import CartSummary from "./cart-summary";
import CartPageSkeleton from "./cart-page-skeleton";
import EmptyCart from "./empty-cart";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useClearCart } from "@/hooks/use-clear-cart";
import { Loader2 } from "lucide-react";
import ContinueShoppingBtn from "./continue-shopping-btn";

export default function CartPageView() {
  // Translations
  const t = useTranslations("cart");

  // Queries
  const { cart, isPending, isError } = useGetCart();
  const { mutate: clearCart, isPending: isClearingCart } = useClearCart();

  if (isPending) {
    return <CartPageSkeleton />;
  }

  if (isError || !cart) {
    return (
      <section className="flex w-full min-h-[40vh] items-center justify-center">
        <p className="text-sm font-medium text-red-500">Failed to load cart.</p>
      </section>
    );
  }

  if (cart.numOfCartItems === 0) {
    return <EmptyCart />;
  }

  return (
    <section
      aria-labelledby="cart-heading"
      className="grid gap-8 lg:grid-cols-[1fr_360px]"
    >
      <div>
        <header className="mb-5 flex justify-between">
          <div className="flex gap-4 items-end">
            <h1
              id="cart-heading"
              className="text-3xl font-bold text-maroon-600 lg:text-4xl"
            >
              {t("title")}
            </h1>

            <span className="text-sm text-zinc-500">
              {cart.numOfCartItems} {t("products")}
            </span>
          </div>
          <Button
            variant={"default"}
            onClick={() => clearCart()}
            className="bg-maroon-50 px-10 text-maroon-500 rounded-xl hover:bg-maroon-100 hover:text-maroon-600 transition-colors duration-300 "
          >
            {isClearingCart ? (
              <>
                <Loader2 className="animate-spin" />
              </>
            ) : (
              t("empty")
            )}
          </Button>
        </header>
        <div className="space-y-4">
          {cart.cart.cartItems.map((item) => (
            <CartItemCard key={item._id} item={item} />
          ))}
        </div>
      </div>

      <CartSummary cart={cart.cart} />
      <ContinueShoppingBtn />
    </section>
  );
}
