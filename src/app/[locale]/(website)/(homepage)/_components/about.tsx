"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/tailwind-merge";

export default function About() {
  const t = useTranslations("about");

  const features = [
    t("features.f1"),
    t("features.f2"),
    t("features.f3"),
    t("features.f4"),
  ];

  const images = {
    main: "/assets/mainAbout.png",
    small: ["/assets/About2.png", "/assets/About3.png"],
  };

  return (
    <section className="grid grid-cols-1 xl:grid-cols-2">
      {/* Images Section */}
      <div className="flex flex-col xl:flex-row items-center xl:items-start gap-6 xl:gap-8">
        <div className="relative h-64 sm:h-72 xl:h-80 w-64 sm:w-72 xl:w-80 flex-shrink-0">
          <div className="absolute left-0 top-6 xl:top-8 z-0 h-64 sm:h-72 xl:h-80 w-56 sm:w-64 xl:w-72 rotate-3 rounded-shape-main border-4 border-maroon-600 before:content-['']" />

          <div className="relative left-4 sm:left-5 xl:left-7 top-8 xl:top-12 z-10 h-64 sm:h-72 xl:h-80">
            <Image
              src={images.main}
              alt="Main gift box"
              fill
              priority
              className="rounded-shape-main object-cover"
            />
          </div>
        </div>

        <div className="flex xl:flex-col gap-2 sm:gap-3 xl:mt-2 xl:pl-5">
          {images.small.map((src, index) => (
            <div
              key={index}
              className={cn(
                "relative overflow-hidden",
                index === 0
                  ? "h-28 sm:h-36 xl:h-48 w-28 sm:w-36 xl:w-48"
                  : "h-24 sm:h-32 xl:h-36 w-28 sm:w-36 xl:w-48"
              )}
            >
              <Image
                src={src}
                alt="Small gift"
                fill
                className={cn(
                  "object-cover",
                  index === 1 ? "rounded-shape-alt" : "rounded-full"
                )}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-center space-y-3 sm:space-y-4 xl:space-y-4 text-center xl:text-left">
        <div>
          <h2 className="pb-2 xl:pb-4 text-xs sm:text-sm font-bold uppercase tracking-wider text-softPink-500 dark:text-maroon-400">
            {t("title")}
          </h2>

          <h3 className="mb-2 text-xl sm:text-2xl xl:text-3xl font-bold leading-tight text-maroon-700 dark:text-softPink-200">
            {t("heading.beforeFinest")}{" "}
            <span className="text-softPink-500 dark:text-maroon-400">
              {t("heading.finest")}
            </span>{" "}
            {t("heading.beforeSpecial")}{" "}
            <span className="text-softPink-500 dark:text-maroon-400">
              {t("heading.special")}
            </span>{" "}
            {t("heading.afterSpecial")}
          </h3>

          <p className="text-sm sm:text-base leading-relaxed text-zinc-500">
            {t("description")}
          </p>
        </div>

        <div className="pt-2 flex justify-center xl:justify-start">
          <Link
            href="/products"
            className="flex w-fit items-center gap-2 xl:gap-3 rounded-lg bg-maroon-600 dark:bg-softPink-200 px-5 xl:px-6 py-2 text-white dark:text-zinc-800"
          >
            <span className="text-xs sm:text-sm font-semibold">
              {t("button")}
            </span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 xl:gap-x-8 xl:gap-y-4 pt-3 xl:pt-4">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center justify-center xl:justify-start gap-2 text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-50"
            >
              <Check className="h-4 w-4 stroke-[0.20rem] text-maroon-700 dark:text-softPink-400" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
