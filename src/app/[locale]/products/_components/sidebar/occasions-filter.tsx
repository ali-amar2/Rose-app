"use client";

import React, { useMemo, forwardRef, useImperativeHandle } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/tailwind-merge";
import { useOccasions } from "@/hooks/use-occasions";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";

const ProductFilters = forwardRef((_, ref) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const IMAGE_BASE_URL = "https://flower.elevateegy.com/uploads/";

  const { data: occasionsData, isLoading, isError } = useOccasions();

  const currentOccasions = useMemo(
    () => searchParams.get("occasion")?.split(",") || [],
    [searchParams]
  );

  const updateUrl = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleOccasionToggle = (id: string) => {
    let newSelection = [...currentOccasions];
    if (newSelection.includes(id)) {
      newSelection = newSelection.filter((item) => item !== id);
    } else {
      newSelection.push(id);
    }
    updateUrl({
      occasion: newSelection.length > 0 ? newSelection.join(",") : null,
    });
  };

  useImperativeHandle(ref, () => ({
    resetLocal: () => updateUrl({ occasion: null }),
  }));

  const resetOccasions = () => updateUrl({ occasion: null });

  if (isError)
    return <div className="p-4 text-red-500">Error loading filters.</div>;

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-lg  text-zinc-900">Occasion</h3>
        {currentOccasions.length > 0 && (
          <button
            onClick={resetOccasions}
            className="flex items-center gap-1 text-red-600 text-md cursor-pointer"
          >
            <X size={20} />
            Reset
          </button>
        )}
      </div>
      <div className="w-full bg-white max-h-80 overflow-auto hide-scrollbar">
        <div className="grid grid-cols-2 gap-x-5 gap-y-2">
          {isLoading
            ? Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className=" bg-zinc-100  rounded-xl" />
                ))
            : occasionsData?.occasions.map((occasion) => {
                const isSelected = currentOccasions.includes(occasion._id);
                return (
                  <div
                    key={occasion._id}
                    onClick={() => handleOccasionToggle(occasion._id)}
                    className="group relative h-20 rounded-xl overflow-hidden cursor-pointer border-2 border-transparent transition-all active:scale-95"
                  >
                    <Image
                      src={`${IMAGE_BASE_URL}${occasion.image}`}
                      alt={occasion.name}
                      fill
                      className="object-cover"
                    />
                    <div
                      className={cn(
                        "absolute inset-0 flex items-center justify-center p-2 text-center transition-all duration-300",
                        !isSelected && "bg-black/40 group-hover:bg-black/20",
                        isSelected &&
                          "bg-gradient-to-t from-maroon-800/90 to-maroon-800/0"
                      )}
                    >
                      <span className=" text-zinc-50  ">{occasion.name}</span>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
});

export default ProductFilters;
