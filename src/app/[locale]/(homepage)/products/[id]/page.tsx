import React, { Suspense } from "react";
import ProductDetails from "./_components/product-details";
import ProductDetailsSkeleton from "./_components/product-details-skeleton";

export default function page({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<ProductDetailsSkeleton />}>
      <ProductDetails id={params.id} />
    </Suspense>
  );
}
