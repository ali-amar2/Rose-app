import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Rating from "@/components/ui/rating";
import ProductBadge from "./product-badge";
import { useTranslations } from "next-intl";

export default function ProductCard({
  img,
  title,
  price,
  priceAfterDiscount,
  quantity,
  sold,
}: ProductCardProps) {
  // translation
  const t = useTranslations("product");

  return (
    <Card className="border-none shadow-none h-full">
      <CardContent className="flex flex-col h-full px-1 p-0">
        {/* Product image */}
        <div className="relative w-full h-72 overflow-hidden rounded-md">
          <Image
            src={img}
            alt={title}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <ProductBadge quantity={quantity} sold={sold} />
        </div>

        <div className="flex flex-col space-y-1 mt-2">
          {/* Product title */}
          <p className="font-semibold capitalize text-lg text-maroon-600 line-clamp-1">
            {title}
          </p>

          <div className="flex justify-between items-center">
            {/* Rating and price */}
            <div className="flex flex-col">
              <Rating />
              <span className="text-maroon-600 font-semibold">
                {priceAfterDiscount} {t("currency")}{" "}
                <span className="text-zinc-500 line-through">
                  {price} {t("currency")}
                </span>
              </span>
            </div>

            {/* Add to cart button */}
            <div className="flex justify-center items-center w-9 h-9 text-white bg-maroon-600 hover:bg-maroon-700 rounded-full cursor-pointer transition-colors duration-200">
              <ShoppingCart />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
