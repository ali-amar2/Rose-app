"use client";

import Autoplay from "embla-carousel-autoplay";
import { useLocale, useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import TitleOfSection from "@/components/shared/title-of-section";
import TestimonialCard from "./testimonial-card";
import { useRef } from "react";
import { TestimonialsResponse } from "@/lib/types/testimonial";

export default function TestimonialsContent({
  data,
}: {
  data: TestimonialsResponse;
}) {
  const t = useTranslations("testimonials");
  const locale = useLocale();

  const autoplay = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: true,
    })
  );

  const testimonials = data?.testimonials ?? [];

  return (
    <section className="pt-5">
      <TitleOfSection title={t("title")} subtitle={t("sub-title")} />

      <div className="bg-maroon-50 dark:bg-zinc-800 px-4 py-14 overflow-hidden">
        {testimonials.length === 0 ? (
          <p className="text-lg text-center text-zinc-500 font-medium">
            {t("empty") || "No testimonials available yet"}
          </p>
        ) : (
          <Carousel
            plugins={[autoplay.current]}
            onMouseEnter={() => autoplay.current.stop()}
            onMouseLeave={() => autoplay.current.play()}
            opts={{
              align: "start",
              loop: true,
              direction: locale === "ar" ? "rtl" : "ltr",
            }}
            className="container mx-auto"
          >
            <CarouselContent className="px-2 sm:px-5">
              {testimonials.map((item) => (
                <CarouselItem
                  key={item._id}
                  className="basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="flex justify-center">
                    <TestimonialCard {...item} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>
    </section>
  );
}
