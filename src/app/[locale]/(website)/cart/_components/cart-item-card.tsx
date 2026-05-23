import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CartItem } from "@/lib/types/cart";

export default function CartItemCard({ item }: { item: CartItem }) {
  return (
    <article className="flex gap-4 rounded-2xl border bg-white p-4 shadow-sm transition-colors hover:border-maroon-200">
      {/* Cart Item Image */}
      <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-xl bg-zinc-100">
        <Image
          src={item.product.imgCover}
          alt={item.product.title}
          fill
          sizes="112px"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col">
        {/* Cart Item Price and Quantity */}
        <div className="flex justify-between gap-4">
          <div className="space-y-1">
            <h2 className="line-clamp-1 text-lg font-semibold text-maroon-600">
              {item.product.title}
            </h2>

            <p className="text-sm text-zinc-500">Quantity: {item.quantity}</p>
          </div>

          <Button size="icon" variant="destructive" aria-label="Remove item">
            <Trash2 size={16} />
          </Button>
        </div>

        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="text-xl font-bold text-maroon-600">
            EGP {item.price}
          </span>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </Button>

            <span className="min-w-[32px] text-center font-medium">
              {item.quantity}
            </span>

            <Button
              size="icon"
              variant="outline"
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
