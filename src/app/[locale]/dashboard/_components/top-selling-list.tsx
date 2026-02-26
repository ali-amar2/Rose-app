"use client";

import { TopSellingProduct } from "@/lib/types/dashboard/product";

// Rank 1 → gold | rank 2 → silver | rank 3 → bronze | rest → plain
const getRankClass = (rank: number) => {
  if (rank === 1)
    return "bg-gradient-to-r from-yellow-400/25 to-yellow-400/10 font-semibold";
  if (rank === 2)
    return "bg-gradient-to-r from-slate-400/25 to-slate-400/10 font-semibold";
  if (rank === 3)
    return "bg-gradient-to-r from-orange-900/25 to-orange-900/10 font-semibold";
  return "bg-zinc-100 font-normal";
};

// Types
type TopSellingListProps = {
  products: TopSellingProduct[];
};

// component
export function TopSellingList({ products }: TopSellingListProps) {
  // render
  return (
    <div className="flex flex-col gap-2.5  max-h-[21.7rem] overflow-y-auto hide-scrollbar w-full">
      {products.map((product, index) => (
        <div
          key={product._id}
          className={`flex items-center justify-between h-8 rounded px-2.5 py-1.5 ${getRankClass(index + 1)}`}
        >
          {/* Title + price */}
          <div className="flex items-center gap-1 min-w-0 flex-1 mr-4">
            <span className="text-base text-zinc-800  truncate">
              {product.title.length > 30
                ? product.title.slice(0, 28) + "..."
                : product.title}
            </span>
            <span className="text-xs text-zinc-400 shrink-0">
              ({product.price.toLocaleString()} EGP)
            </span>
          </div>

          {/* Sales */}
          <span className="text-sm font-bold text-zinc-800 shrink-0">
            {product.sold.toLocaleString()}{" "}
            <span className="font-medium ">Sales</span>
          </span>
        </div>
      ))}
    </div>
  );
}
