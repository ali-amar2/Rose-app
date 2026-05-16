import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

// cards data (keys فقط)
const cards = [
  {
    img: "/assets/s1.png",
    titleKey: "cards.wedding.title",
    badgeKey: "cards.wedding.badge",
  },
  {
    img: "/assets/s2.png",
    titleKey: "cards.engagement.title",
    badgeKey: "cards.engagement.badge",
  },
  {
    img: "/assets/s3.png",
    titleKey: "cards.anniversary.title",
    badgeKey: "cards.anniversary.badge",
  },
];

export default function SecondSection() {
  const t = useTranslations("secondSection");

  return (
    <section
      aria-label={t("aria")}
      className="grid grid-cols-1 gap-4 lg:grid-cols-3"
    >
      {cards.map((item, idx) => (
        <article
          key={idx}
          className="group relative h-[240px] overflow-hidden rounded-2xl sm:h-[280px] lg:h-[340px]"
        >
          <Image
            src={item.img}
            alt={t(item.titleKey)}
            fill
            priority={idx === 0}
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5 lg:p-6">
            <span className="mb-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-maroon-700">
              {t(item.badgeKey)}
            </span>

            <h2 className="max-w-[95%] text-base font-semibold leading-relaxed text-white sm:text-lg lg:text-xl xl:text-2xl">
              {t(item.titleKey)}
            </h2>
          </div>
        </article>
      ))}
    </section>
  );
}
