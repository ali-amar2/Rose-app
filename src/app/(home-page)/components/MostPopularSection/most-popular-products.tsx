"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MostPopularTabs from "./most-popular-tabs";
import ProductCard from "@/components/shared/product-card";
import { useProducts } from "@/hooks/use-products";
import { LoaderCircle } from "lucide-react";

export default function MostPopularProducts({
  initialOccasion,
  occasions,
}: MostPopularProductsProps) {
  // Navigation
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [selectedOccasion, setSelectedOccasion] = useState(initialOccasion);

  // Queries
  const { data: products, isLoading } = useProducts({
    limit: 12,
    sort: "-rateCount",
    occasion: selectedOccasion,
  });

  // Functions
  const handleOccasionChange = (occasionId: string) => {
    if (occasionId === selectedOccasion) return;
    setSelectedOccasion(occasionId);
  };

  // Effects
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("occasion", selectedOccasion);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [selectedOccasion, router, searchParams]);

  return (
    <section className="flex flex-col h-full gap-6 w-full">
      <div className="flex justify-between">

        {/* TODO: Waiting for title component */}
        <h2 className="text-maroon-600 text-2xl font-semibold">Most Popular</h2>
        <MostPopularTabs
          occasions={occasions}
          selected={selectedOccasion}
          onChange={handleOccasionChange}
        />
      </div>

      {isLoading && (
        <p className="flex justify-center items-center text-center text-lg text-maroon-600">
          <LoaderCircle className="h-10 w-10 animate-spin" />
        </p>
      )}

      <div className="grid grid-cols-4 gap-4 w-full">
        {products?.products?.length === 0 && !isLoading && (
          <p className="col-span-full text-center text-lg text-maroon-600">
            No products found for this occasion.
          </p>
        )}

        {products?.products?.map((product: Product) => (
          <ProductCard
            key={product._id}
            img={product.imgCover}
            title={product.title}
            price={product.price}
            priceAfterDiscount={product.priceAfterDiscount}
          />
        ))}
      </div>
    </section>
  );
}
