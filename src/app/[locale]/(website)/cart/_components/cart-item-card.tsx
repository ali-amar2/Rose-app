"use client";

import Image from "next/image";
import { Minus, Plus, Trash2, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/lib/types/cart";
import { useRemoveCartItem } from "@/hooks/use-remove-cart-item";
import { useUpdateCartItemQuantity } from "@/hooks/use-update-cart-item";

type CartItemCardProps = {
  item: CartItem;
};

export default function CartItemCard({ item }: CartItemCardProps) {
  // Translations
  const t = useTranslations("cart");

  // Mutations
  const { mutate: updateQuantity, isPending: isUpdatingQuantity } =
    useUpdateCartItemQuantity();

  const { mutate: removeCartItem, isPending: isRemovingItem } =
    useRemoveCartItem();

  // Handlers
  const handleIncreaseQuantity = () => {
    updateQuantity({
      productId: item.product._id,
      quantity: item.quantity + 1,
    });
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity <= 1) return;

    updateQuantity({
      productId: item.product._id,
      quantity: item.quantity - 1,
    });
  };

  const handleRemoveItem = () => {
    removeCartItem(item.product._id);
  };

  const isLoading = isUpdatingQuantity || isRemovingItem;

  return (
    <article
      className="
        flex gap-4 rounded-2xl border bg-white p-4 shadow-sm
        transition-colors hover:border-maroon-200
      "
    >
      {/* Cart Item Image */}
      <div
        className="
          relative h-28 w-28 flex-shrink-0 overflow-hidden
          rounded-xl bg-zinc-100
        "
      >
        <Image
          src={item.product.imgCover}
          alt={item.product.title}
          fill
          sizes="112px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col">
        {/* Top */}
        <div className="flex justify-between gap-4">
          <div className="space-y-1">
            <h2
              className="
                line-clamp-1 text-lg font-semibold
                text-maroon-600
              "
            >
              {item.product.title}
            </h2>

            <p className="text-sm text-zinc-500">Quantity: {item.quantity}</p>
          </div>

          <Button
            size="icon"
            variant="destructive"
            onClick={handleRemoveItem}
            disabled={isLoading}
            aria-label={t("remove-product")}
          >
            {isRemovingItem ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Trash2 size={16} />
            )}
          </Button>
        </div>

        {/* Bottom */}
        <div
          className="
            mt-auto flex items-center
            justify-between pt-5
          "
        >
          <span
            className="
              text-xl font-bold
              text-maroon-600
            "
          >
            {t("currency")} {item.price}
          </span>

          {/* Quantity Controls */}
          <div
            className="
              flex items-center gap-2
            "
          >
            <Button
              size="icon"
              variant="outline"
              onClick={handleDecreaseQuantity}
              disabled={item.quantity <= 1 || isLoading}
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </Button>

            <span
              className="
                min-w-[32px]
                text-center font-medium
              "
            >
              {isUpdatingQuantity ? (
                <Loader2 size={16} className="mx-auto animate-spin" />
              ) : (
                item.quantity
              )}
            </span>

            <Button
              size="icon"
              variant="outline"
              onClick={handleIncreaseQuantity}
              disabled={isLoading}
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
