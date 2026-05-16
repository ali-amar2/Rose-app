import React, { Suspense } from "react";
import { BestSellingCarousel } from "./best-selling-carousel";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { getTranslations } from "next-intl/server";

export default async function BestSellingSection() {
  const t = await getTranslations("best-selling");

  return (
    <section className="flex w-full flex-col">
      <div className="flex flex-col lg:flex-row gap-5">
        {/* Left Content */}
        <div className="flex w-full lg:w-[18.5%] flex-col justify-between flex-shrink-0">
          <div>
            <h2 className="text-sm sm:text-lg font-semibold tracking-widest uppercase mb-3 text-softPink-500">
              {t("title")}
            </h2>

            <p className="text-xl sm:text-2xl leading-tight mb-2 font-bold text-maroon-600">
              <span className="text-softPink-500">
                {t("subtitle.checkOut")}
              </span>{" "}
              {t("subtitle.restBeforeBuying")}
              <span className="text-softPink-500">{t("subtitle.buying")}</span>
              {t("subtitle.rest-after-buying")}
            </p>

            <p className="text-sm text-zinc-500 p-1">{t("description")}</p>
          </div>

          <Link
            href="/products"
            className="flex gap-3 items-center justify-center sm:justify-start bg-maroon-600 hover:bg-maroon-700 transition-colors duration-300 text-white px-5 py-2 rounded-xl w-full sm:w-fit mt-4 lg:mt-0"
          >
            {t("button")}
            <ArrowRight className="w-4" />
          </Link>
        </div>

        {/* Carousel */}
        <div className="w-full">
          <BestSellingCarousel />
        </div>
      </div>
    </section>
  );
}
