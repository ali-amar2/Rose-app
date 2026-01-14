"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { useLocale, useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import TestimonialCard from "./testimonial-card";
import Vector1 from "./assets/Vector1.png";
import Vector2 from "./assets/Vector2.png";
import Vector3 from "./assets/Vector3.png";
import ToggleLanguage from "@/components/features/toggle-language";

export function Testimonials() {
  // translation hook
  const t = useTranslations("testimonials");
  const locale = useLocale(); // Get the current locale

  // create the autoplay plugin
  const autoplay = React.useRef(
    Autoplay({ delay: 1000, stopOnInteraction: false })
  );

  // testimonial data array
  const testimonialData = [
    {
      imgSrc: Vector1,
      name: t("user1.name"),
      rate: 3,
      description: t("user1.description"),
      date: t("user1.date"),
    },
    {
      imgSrc: Vector2,
      name: t("user2.name"),
      rate: 4,
      description: t("user2.description"),
      date: t("user2.date"),
    },
    {
      imgSrc: Vector3,
      name: t("user3.name"),
      rate: 3,
      description: t("user3.description"),
      date: t("user3.date"),
    },
    {
      imgSrc: Vector1,
      name: t("user1.name"),
      rate: 3,
      description: t("user1.description"),
      date: t("user1.date"),
    },
    {
      imgSrc: Vector2,
      name: t("user2.name"),
      rate: 4,
      description: t("user2.description"),
      date: t("user2.date"),
    },
    {
      imgSrc: Vector3,
      name: t("user3.name"),
      rate: 3,
      description: t("user3.description"),
      date: t("user3.date"),
    },
  ];

  return (
    <section className="">
      {/* TODO: Waiting for title Component */}
      <div className="mb-10 flex flex-col items-center justify-center pt-10">
        {/* TODO: Waiting for header to add toggle button */}
        <ToggleLanguage />
        <h2 className=" mt-4 mb-2 text-center text-3xl font-bold">
          {t("title")}
        </h2>
        <p className="text-center">{t("sub-title")}</p>
      </div>
      {/* TODO: Waiting for disgin system for background color*/}
      <div className="bg-[#FBEAEA] px-4 py-14  overflow-hidden">
        {/* carousel section */}
        <Carousel
          plugins={[autoplay.current]} // plugins for autoplay functionality
          onMouseEnter={() => autoplay.current.stop()} // stop autoplay on mouse enter
          onMouseLeave={() => autoplay.current.play()} // resume autoplay on mouse leave
          opts={{
            // carousel options
            align: "start",
            loop: true,
            direction: locale === "ar" ? "rtl" : "ltr",
          }}
          className="container mx-auto"
        >
          <CarouselContent className="px-5">
            {/* map for testimonial card  */}
            {testimonialData.map((item, index) => (
              <CarouselItem
                key={index} // Add a unique key for each item
                className="basis-1/3"
              >
                <div className="p-0 h-full">
                  <div className="flex l items-center justify-center">
                    {/* call dynamic testimonial card  */}
                    <TestimonialCard
                      imgSrc={item.imgSrc}
                      name={item.name}
                      rate={item.rate}
                      description={item.description}
                      date={item.date}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
