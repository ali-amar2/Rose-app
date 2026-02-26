"use client";

import { useGetStatistics } from "../_hooks/useGetProductsStatistics";
import { LowStockList } from "./low-stock-list";
import { LowStockProduct } from "@/lib/types/dashboard/product";

// component
export default function LowStock() {
  // custom hook
  const { statistics, isLoading } = useGetStatistics();

  // Flatten All Products
  const allProducts: LowStockProduct[] = (
    statistics?.products.productsByCategory ?? []
  ).flatMap((cat) =>
    cat.products.map((p: LowStockProduct) => ({
      _id: p.title,
      title: p.title,
      imgCover: p.imgCover,
      price: p.price,
      quantity: Math.max(0, p.quantity),
    }))
  );

  // Sort ascending
  const sorted = allProducts.sort((a, b) => a.quantity - b.quantity);

  return (
    <div className="w-[33.5rem] min-h-[28rem] rounded-2xl p-6 bg-white flex flex-col gap-6 shadow-lg">
      <h2 className="text-2xl font-semibold text-zinc-800">
        Low Stock Products
      </h2>
      {/* loading */}
      {isLoading ? (
        <p className="text-sm text-zinc-400">Loading...</p>
      ) : (
        <LowStockList products={sorted} />
      )}
    </div>
  );
}
