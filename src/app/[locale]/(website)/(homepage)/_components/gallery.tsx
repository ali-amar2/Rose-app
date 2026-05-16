"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/tailwind-merge";

const galleryImages = [
  {
    src: "/assets/gallery1.png",
    alt: "Gift Boxes",
    className:
      "xl:col-span-4 xl:row-span-7 col-span-12 sm:col-span-6 md:col-span-4 h-64 sm:h-80 xl:h-auto",
  },
  {
    src: "/assets/gallery2.png",
    alt: "Flowers & Chocolate",
    className:
      "xl:col-span-4 xl:row-span-5 xl:row-start-8 col-span-12 sm:col-span-6 md:col-span-4 h-64 sm:h-80 xl:h-auto",
  },
  {
    src: "/assets/gallery3.png",
    alt: "Red Gifts",
    className:
      "xl:col-span-4 xl:row-span-5 xl:col-start-5 col-span-12 sm:col-span-6 md:col-span-4 h-64 sm:h-80 xl:h-auto",
  },
  {
    src: "/assets/gallery4.png",
    alt: "Ring Detail",
    className:
      "xl:col-span-4 xl:row-span-7 xl:col-start-5 xl:row-start-6 col-span-12 sm:col-span-6 md:col-span-4 h-64 sm:h-80 xl:h-auto",
  },
  {
    src: "/assets/gallery5.png",
    alt: "Engagement Ring",
    className:
      "xl:col-span-4 xl:row-span-5 xl:col-start-9 col-span-12 sm:col-span-6 md:col-span-4 h-64 sm:h-80 xl:h-auto",
  },
  {
    src: "/assets/3.png",
    alt: "Engagement Card",
    className:
      "xl:col-span-4 xl:row-span-7 xl:col-start-9 xl:row-start-6 col-span-12 sm:col-span-6 md:col-span-4 h-64 sm:h-80 xl:h-auto",
  },
];

export default function Gallery() {
  const t = useTranslations("gallery");

  return (
    <section className="container mx-auto">
      <div className="flex flex-col items-center py-6 sm:py-8">
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-softPink-500 dark:text-maroon-400">
          {t("label")}
        </h2>

        {/* pseudo-elements via Tailwind after: / before: */}
        <div className="relative mt-2 text-center">
          <p className="text-2xl sm:text-3xl xl:text-4xl font-bold text-maroon-700 dark:text-softPink-200 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:-z-10 after:h-4 after:w-3/4 after:rounded-e-2xl after:bg-softPink-100 dark:after:bg-zinc-700">
            {t("title")}
          </p>
          <div className="mx-auto mt-2 h-0.5 w-1/3 bg-softPink-600" />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3 h-auto xl:h-[67rem] xl:grid-rows-12 w-full">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className={cn(
              "relative overflow-hidden rounded-2xl shadow-sm transition-transform duration-300 hover:scale-[1.01]",
              image.className
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 400px"
              className="object-fill"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
