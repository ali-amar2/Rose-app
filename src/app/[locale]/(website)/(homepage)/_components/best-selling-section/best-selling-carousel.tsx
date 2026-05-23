import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import ProductCard from "@/components/shared/product-card";
import { Product } from "@/lib/types/product";
import { useLocale } from "next-intl";

type BestSellingCarouselProps = {
  products: Product[];
};

export function BestSellingCarousel({ products }: BestSellingCarouselProps) {
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <Carousel
      opts={{ align: "start" }}
      className="relative h-full w-full"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <CarouselContent className="-ml-3 h-full">
        {products.map((product) => (
          <CarouselItem
            key={product._id}
            className="pl-3 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
          >
            <ProductCard
              id={product._id}
              img={product.imgCover}
              title={product.title}
              price={product.price}
              priceAfterDiscount={product.priceAfterDiscount}
              quantity={product.quantity}
              sold={product.sold}
              rateAvg={product.rateAvg}
              createdAt={product.createdAt}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Prev */}
      <CarouselPrevious
        className={`absolute top-1/2 -translate-y-1/2 bg-maroon-600 text-white hover:bg-maroon-700 hover:text-white
        ${isRTL ? "left-auto right-0" : "-left-3 right-auto"}`}
      />

      {/* Next */}
      <CarouselNext
        className={`absolute top-1/2 -translate-y-1/2 bg-maroon-600 text-white hover:bg-maroon-700 hover:text-white
        ${isRTL ? "left-0 right-auto" : "-right-3 left-auto"}`}
      />
    </Carousel>
  );
}
