import OccasionsTabs from "./occasions-tabs";
import ProductCard from "@/components/shared/product-card";
import { MoveRight } from "lucide-react";
import TitleOfSection from "@/components/shared/title-of-section";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MostPopularProductsProps } from "@/lib/types/product";

export default function MostPopular({
  occasions,
  initialOccasion,
  initialProducts,
}: MostPopularProductsProps) {
  const t = useTranslations("most-popular");

  return (
    <section className="flex flex-col gap-6 w-full">
      <header className="flex flex-col gap-2 lg:flex-row lg:justify-between lg:items-end">
        {/* Title */}
        <div className="w-full lg:w-auto flex justify-start">
          <TitleOfSection
            title={""}
            subtitle={t("title")}
            className="py-0"
            subtitleClassName="text-2xl sm:text-3xl"
          />
        </div>

        {/* Tabs */}
        <div className="w-full lg:w-auto flex lg:justify-end">
          <div className="w-full lg:w-auto overflow-x-auto scrollbar-hide">
            <OccasionsTabs
              occasions={occasions}
              activeOccasion={initialOccasion}
            />
          </div>
        </div>
      </header>

      {initialProducts.products.length === 0 ? (
        <p className="flex justify-center items-center text-maroon-600 text-base sm:text-lg py-5">
          {t("empty")}
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {initialProducts.products.map((product) => (
            <ProductCard
              key={product._id}
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
          ))}
        </div>
      )}

      {initialProducts.products.length !== 0 && (
        <Link
          href={`/products`}
          className="flex gap-2 justify-end text-maroon-700 font-bold text-sm sm:text-base hover:opacity-80 transition"
        >
          {t("view-more")} <MoveRight />
        </Link>
      )}
    </section>
  );
}
