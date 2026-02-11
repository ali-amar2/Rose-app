"use client";

import { useState } from "react";
import OrderItemCard from "./order-item-card";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import { useTranslations } from "next-intl";

export default function OrderItemsPreview({ items }: OrderItemsPreviewProps) {
  // Translation
  const t = useTranslations("orders");
  // States
  const [showAll, setShowAll] = useState(false);
  // Variables
  const shouldCollapse = items.length > 2;

  return (
    <>
      <p className="mb-2 font-medium">{t("order-items")} :</p>
      <div className="relative">
        {/* Grid Container */}
        <div
          className={clsx(
            "grid md:grid-cols-2 gap-2 overflow-hidden transition-all duration-300",
            !showAll && shouldCollapse && "max-h-[260px]"
          )}
        >
          {items.map((item) => (
            <OrderItemCard key={item._id} item={item} />
          ))}
        </div>

        {/* Blur + Show All */}
        {!showAll && shouldCollapse && (
          <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-zinc-100 via-zinc-100/80 to-transparent flex items-end justify-center">
            <button
              onClick={() => setShowAll(true)}
              className="flex flex-col items-center text-sm text-maroon-600 font-medium mb-2"
            >
              {t("show-all")}
              <ChevronDown size={18} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
