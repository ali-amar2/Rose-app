"use client";

import { Loader2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAddToCart } from "@/hooks/use-add-to-cart";

type AddToCartButtonProps = {
  productId: string;
  quantityInStock: number;
  className?: string;
};

export default function AddToCartButton({
  productId,
  quantityInStock,
}: AddToCartButtonProps) {
  // Hooks
  const { addToCart, isPending } = useAddToCart();

  // Toast
  const { toast } = useToast();

  // Variables
  const isOutOfStock = quantityInStock < 1;

  // Add to cart handler
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      product: productId,
      quantity: 1,
    });
  };

  return (
    <Button
      type="button"
      size="icon"
      onClick={handleAddToCart}
      disabled={isPending || isOutOfStock}
      aria-label={isPending ? "Adding product to cart" : "Add product to cart"}
      aria-busy={isPending}
      aria-disabled={isPending || isOutOfStock}
      className="h-11 w-11 rounded-full transition-colors duration-200 "
    >
      {isPending ? (
        <Loader2 size={20} className="animate-spin" aria-hidden="true" />
      ) : (
        <ShoppingCart size={20} aria-hidden="true" />
      )}
    </Button>
  );
}
