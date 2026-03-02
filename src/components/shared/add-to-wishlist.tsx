"use client";

import { HeartMinus, HeartPlus } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/tailwind-merge";
import useToggleWishlist from "@/hooks/use-toggle-wishlist";

type Props = {
  productId: string;
};

export default function AddToWishlist({ productId }: Props) {
  // Translation
  const t = useTranslations("");

  // State
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showRemove, setShowRemove] = useState<boolean>(false);

  // query
  const {
    mutation: toggleWishlist,
    data,
    isLoading,
  } = useToggleWishlist(productId);

  // function
  const handleToggle = async () => {
    toggleWishlist.mutate();
  };

  return (
    <div>
      {data ? (
        <button
          onClick={handleToggle}
          onMouseEnter={() => setShowRemove(true)}
          onMouseLeave={() => setShowRemove(false)}
          disabled={isLoading}
          className="bg-black text-white rounded-full h-8 flex rtl:flex-row-reverse items-center justify-center absolute top-2 left-2 px-2"
        >
          <HeartMinus size={18} strokeWidth={2.5} />
          {showRemove && (
            <span className="px-1 text-xs font-medium">
              {t("remove-from-wishlist")}
            </span>
          )}
        </button>
      ) : (
        <button
          onClick={handleToggle}
          onMouseEnter={() => setShowAdd(true)}
          onMouseLeave={() => setShowAdd(false)}
          disabled={isLoading}
          className="bg-white text-maroon-600 rounded-full h-8 flex rtl:flex-row-reverse items-center justify-center absolute top-2 left-2 px-2"
        >
          <HeartPlus size={18} strokeWidth={2.5} />
          {showAdd && (
            <span
              className={cn(
                "px-1 text-xs font-medium transition-all duration-1000 ease-in-out",
                showAdd && "opacity-100 translate-x-0"
              )}
            >
              {t("add-to-wishlist")}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
