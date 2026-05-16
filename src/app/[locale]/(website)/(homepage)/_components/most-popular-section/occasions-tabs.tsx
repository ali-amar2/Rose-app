"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { MostPopularTabsProps, Occasion } from "@/lib/types/occasion";
import clsx from "clsx";
import { useTranslations } from "next-intl";

export default function OccasionsTabs({
  occasions,
  activeOccasion,
}: MostPopularTabsProps) {
  const t = useTranslations("most-popular.occasion");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("occasion", id);

    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex gap-3 w-max sm:w-full overflow-x-auto sm:overflow-visible px-1">
      {occasions.map((occasion: Occasion) => (
        <button
          key={occasion._id}
          onClick={() => handleClick(occasion._id)}
          className={clsx(
            "text-sm md:text-lg font-medium whitespace-nowrap px-0.5 md:px-2 py-1 transition-colors",
            activeOccasion === occasion._id
              ? "text-maroon-600 border-b-2 border-maroon-600"
              : "text-zinc-700 hover:text-maroon-500"
          )}
        >
          {t(occasion.name)}
        </button>
      ))}
    </div>
  );
}
