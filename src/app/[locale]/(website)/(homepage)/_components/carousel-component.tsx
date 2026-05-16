"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils/tailwind-merge";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

// dummy data
const carouselItems = [
  "/assets/1.png",
  "/assets/2.png",
  "/assets/3.png",
  "/assets/4.png",
];

const sideBanner = "/assets/banner.png";

export default function CarouselComponent() {
  const t = useTranslations("carousel");

  const router = useRouter();

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  return (
    <section aria-label="Featured gifts and promotions" className="w-full">
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[340px_1fr]">
        {/* Side Banner */}
        <article className="relative min-h-[320px] overflow-hidden rounded-3xl bg-[#4A1010] sm:min-h-[380px] xl:min-h-full">
          <Image
            src={sideBanner}
            alt={t("sideTitle")}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 340px"
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 sm:p-7">
            <span className="mb-4 w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold text-rose-700 shadow-sm">
              {t("sideBadge")}
            </span>

            <h2 className="max-w-[90%] text-2xl font-bold leading-tight text-white sm:text-3xl">
              {t("sideTitle")}
            </h2>

            <p className="mt-3 max-w-[90%] text-sm leading-relaxed text-zinc-200 sm:text-base">
              {t("sideDescription")}
            </p>

            <Button
              aria-label={t("shopNow")}
              onClick={() => router.push("/products")}
              className="mt-6 w-fit rounded-2xl bg-white px-5 py-5 text-sm font-semibold text-rose-900 transition-all hover:bg-rose-700 hover:text-white sm:text-base"
            >
              {t("shopNow")}

              <ArrowRight className="ms-2" size={18} />
            </Button>
          </div>
        </article>

        {/* Main Carousel */}
        <div className="relative overflow-hidden rounded-3xl">
          <Carousel
            setApi={setApi}
            opts={{
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {carouselItems.map((item, index) => (
                <CarouselItem key={index}>
                  <article className="relative h-[320px] overflow-hidden sm:h-[420px] lg:h-[520px] xl:h-[560px]">
                    <Image
                      src={item}
                      alt={`${t("slidesAlt")} ${index + 1}`}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 70vw, 75vw"
                      className="object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 sm:p-8 lg:p-12">
                      <span className="mb-4 w-fit rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-rose-700 backdrop-blur-sm">
                        {t("mainBadge")}
                      </span>

                      <h1 className="max-w-[95%] text-2xl font-bold leading-tight text-white sm:max-w-[80%] sm:text-4xl lg:text-5xl">
                        {t("mainTitle")}
                      </h1>

                      <p className="mt-3 max-w-[90%] text-sm leading-relaxed text-zinc-200 sm:max-w-[70%] sm:text-base lg:text-lg">
                        {t("mainDescription")}
                      </p>

                      <Button
                        aria-label={t("buyNow")}
                        onClick={() => router.push("/products")}
                        className="mt-6 w-fit rounded-2xl bg-[#FDF0F0] px-6 py-6 text-sm font-semibold text-rose-900 transition-all hover:bg-rose-700 hover:text-white sm:px-8 sm:text-base"
                      >
                        {t("buyNow")}
                      </Button>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Dots */}
            <div className="absolute right-4 top-4 z-20 flex items-center gap-2 rounded-full bg-black/20 px-3 py-2 backdrop-blur-md sm:right-6 sm:top-6">
              {carouselItems.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => api?.scrollTo(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    current === index ? "w-7 bg-white" : "w-2 bg-white/50"
                  )}
                />
              ))}
            </div>

            {/* Navigation */}
            <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2 rounded-full bg-white/90 p-1.5 shadow-lg backdrop-blur-md rtl:right-auto rtl:left-5 sm:bottom-8 sm:right-8 sm:rtl:right-auto sm:rtl:left-8">
              <CarouselPrevious className="static h-10 w-10 translate-y-0 rounded-full border-none bg-transparent hover:bg-zinc-100" />

              <CarouselNext className="static h-10 w-10 translate-y-0 rounded-full border-none bg-transparent hover:bg-zinc-100" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
