"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import type { Cart } from "@/lib/types/cart";

export default function CartSummary({ cart }: { cart: Cart }) {
  // Translations
  const t = useTranslations("cart");

  return (
    <aside className="h-fit rounded-2xl border bg-white p-6 shadow-sm lg:sticky lg:top-24">
      <h2 className="mb-6 text-2xl font-bold text-maroon-600">
        {t("summary.title")}
      </h2>

      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-zinc-500">{t("summary.subtotal")}</span>

          <span className="font-semibold">
            {t("currency")} {cart.totalPrice}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-500">{t("summary.discount")}</span>

          <span className="font-semibold">0 %</span>
        </div>

        <div className="border-t pt-5">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">{t("summary.total")}</span>

            <span className="text-2xl font-bold text-maroon-600">
              {t("currency")} {cart.totalPrice}
            </span>
          </div>
        </div>

        <Button size="lg" className="w-full">
          {t("summary.checkout")}

          <ArrowRight size={18} />
        </Button>
      </div>
    </aside>
  );
}
