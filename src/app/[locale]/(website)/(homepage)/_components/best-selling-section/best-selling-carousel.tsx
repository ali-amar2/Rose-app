import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getProducts } from "@/lib/services/products.service";
import ProductCard from "@/components/shared/product-card";
import { Product } from "@/lib/types/product";
import { useLocale } from "next-intl";

export async function BestSellingCarousel() {
  const locale = useLocale();
  const isRTL = locale === "ar";

  // Queries
  const data = await getProducts({ sort: "-sold", limit: 6 });

  return (
    <Carousel
      opts={{ align: "start" }}
      className="relative w-full h-full"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <CarouselContent className=" rtl:gap-3 flex h-full">
        {data.products.map((product: Product) => (
          <CarouselItem
            key={product._id}
            className="basis-full sm:basis-1/2 lg:basis-1/3"
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
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Prev */}
      <CarouselPrevious
        className={`bg-maroon-600 absolute top-1/2 -translate-y-1/2 text-white hover:bg-maroon-700 hover:text-white
        ${isRTL ? "right-0 left-auto" : "-left-3 right-auto"}`}
      />

      {/* Next */}
      <CarouselNext
        className={`bg-maroon-600 absolute top-1/2 -translate-y-1/2 text-white hover:bg-maroon-700 hover:text-white
        ${isRTL ? "left-0 right-auto" : "-right-3 left-auto"}`}
      />
    </Carousel>
  );
}
