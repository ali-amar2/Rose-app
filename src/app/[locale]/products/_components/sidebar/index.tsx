"use client";

import { useRef } from "react";
import CategoryFilter from "./category-filter";
import RatingFilter from "./rating-filter";
import ResetAllButton from "./reset-all";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function ProductsSidebar() {
  // Refs
  const categoryRef = useRef<{ resetLocal: () => void }>(null);
  const ratingRef = useRef<{ resetLocal: () => void }>(null);

  // Navigation
  const router = useRouter();
  const pathname = usePathname();

  // Functions
  const handleResetAll = () => {
    // Reset local states inside filters
    categoryRef.current?.resetLocal();
    ratingRef.current?.resetLocal();

    // Remove all search params from URL
    router.push(pathname);
  };

  return (
    <aside className="flex flex-col p-2 gap-4">
      <CategoryFilter ref={categoryRef} />
      <RatingFilter ref={ratingRef} />
      <ResetAllButton onResetAll={handleResetAll} />
    </aside>
  );
}
