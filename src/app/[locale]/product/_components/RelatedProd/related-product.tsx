import { Suspense } from "react";
import { RelatedProductsCarousel } from "./related-products-carousel";
import { Skeleton } from "@/components/ui/skeleton";

// type
type RelatedProductsSectionProps = {
  productId: string;
};

// Loading skeleton for carousel
function CarouselSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-72 w-full rounded-md" />
      ))}
    </div>
  );
}

// component
export default function RelatedProductsSection({
  productId,
}: RelatedProductsSectionProps) {
  // Render
  return (
    <section className="flex w-full flex-col gap-8 mt-14">
      {/* Section title with decorative elements */}
      <div className="relative">
        <h2 className="font-bold text-maroon-700 dark:text-softPink-200 text-3xl">
          Related Products
        </h2>
        {/* Decorative underline */}
        <div className="h-[2px] w-[3%] bg-softPink-600" />
        {/* Decorative background accent */}
        <div className="absolute bottom-0 left-0 w-[9%] h-4 bg-softPink-100 -z-10 rounded-r-2xl" />
      </div>

      {/* Products carousel with loading state */}
      <Suspense fallback={<CarouselSkeleton />}>
        <RelatedProductsCarousel productId={productId} />
      </Suspense>
    </section>
  );
}
