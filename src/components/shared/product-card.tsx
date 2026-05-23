import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Rating from "@/components/ui/rating";
import ProductBadge from "./product-badge";
import { useTranslations, useLocale } from "next-intl";
import AddToCartButton from "./add-to-cart-button";
import { ProductCardProps } from "@/lib/types/product";
import { Link } from "@/i18n/navigation";

export default function ProductCard({
  id,
  img,
  title,
  price,
  priceAfterDiscount,
  quantity,
  sold,
  rateAvg,
  createdAt,
}: ProductCardProps) {
  // Translations
  const t = useTranslations("product");

  // Locale
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <Card
      className="border-none shadow-none h-full"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <CardContent className="flex flex-col h-full px-1 p-0">
        {/* IMAGE */}
        <Link
          href={`/products/${id}`}
          className="relative w-full h-72 block overflow-hidden rounded-xl"
        >
          <Image
            src={img}
            alt={title}
            fill
            className="object-fill md:object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw,25vw"
          />

          <ProductBadge quantity={quantity} sold={sold} createdAt={createdAt} />
        </Link>

        {/* CONTENT */}
        <div className="flex flex-col space-y-1 px-2 mt-2">
          <Link href={`/products/${id}`}>
            <p className="font-semibold capitalize text-lg text-maroon-600 line-clamp-1">
              {title}
            </p>
          </Link>

          <div className="flex justify-between items-center">
            {/* rating + price */}
            <div className="flex flex-col">
              <Rating rate={rateAvg} />

              <span className="text-maroon-600 font-semibold">
                {priceAfterDiscount} {t("currency")}{" "}
                <span className="text-zinc-500 line-through">
                  {price} {t("currency")}
                </span>
              </span>
            </div>

            {/* cart */}
            <AddToCartButton productId={id!} quantityInStock={quantity} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
