import React from "react";
import Image from "next/image";

// dummy gallery data
const galleryImages = [
  {
    src: "/assets/10.png",
    alt: "Gift Boxes",
    className: "col-span-4 row-span-7",
  },
  {
    src: "/assets/7.png",
    alt: "Flowers & Chocolate",
    className: "col-span-4 row-span-5 row-start-8",
  },
  {
    src: "/assets/6.png",
    alt: "Red Gifts",
    className: "col-span-4 row-span-5 col-start-5",
  },
  {
    src: "/assets/9.png",
    alt: "Ring Detail",
    className: "col-span-4 row-span-7 col-start-5 row-start-6",
  },
  {
    src: "/assets/8.png",
    alt: "Engagement Ring",
    className: "col-span-4 row-span-5 col-start-9",
  },
  {
    src: "/assets/3.png",
    alt: "Engagement Card",
    className: "col-span-4 row-span-7 col-start-9 row-start-6",
  },
];

// component
export default function Gallery() {
  return (
    <section className="container mx-auto pb-4">
      {/* Section Header */}
      <div className="flex flex-col items-center py-8">
        <h2 className="font-bold tracking-[0.25em] uppercase text-softPink-500 dark:text-maroon-400">
          Gallery
        </h2>

        <div className="relative mt-2">
          <p className="text-4xl font-bold text-maroon-700 dark:text-softPink-200">
            Check Out our Wonderful Gallery
          </p>

          {/* underline */}
          <div className="mt-2 h-0.5 w-1/3 bg-softPink-600" />

          {/* background highlight */}
          <div className="absolute bottom-0 left-0 -z-10 h-4 w-3/4 rounded-r-2xl bg-softPink-100 dark:bg-zinc-700" />
        </div>
      </div>

      {/* Gallery Images Grid */}
      <div className="grid h-[64rem] w-full grid-cols-12 grid-rows-12 gap-3">
        {galleryImages.map((image, index) => (
          <div key={index} className={`relative ${image.className}`}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
