"use client";

import { useGetStatistics } from "../_hooks/useGetProductsStatistics";
import { TopSellingList } from "./top-selling-list";
import { TopSellingProduct } from "@/lib/types/dashboard/product";

// component
export default function TopSelling() {
  // custom hook
  const { statistics, isLoading } = useGetStatistics();

  // Flatten All Product
  const allProducts: TopSellingProduct[] = (
    statistics?.products.productsByCategory ?? []
  ).flatMap((cat) =>
    cat.products.map((p: TopSellingProduct) => ({
      _id: p.title,
      title: p.title,
      imgCover: p.imgCover,
      price: p.price,
      sold: p.sold,
    }))
  );

  // Sort descending by sold
  const sorted = allProducts.sort((a, b) => b.sold - a.sold);

  // render
  return (
    <div className="w-[33.5rem] min-h-[28rem] rounded-2xl p-6 bg-white flex flex-col gap-6 shadow-lg">
      <h2 className="text-2xl font-semibold text-zinc-800">
        Top Selling Products
      </h2>

      {/* loading */}
      {isLoading ? (
        <p className="text-sm text-zinc-400">Loading...</p>
      ) : (
        <TopSellingList products={sorted} />
      )}
    </div>
  );
}
