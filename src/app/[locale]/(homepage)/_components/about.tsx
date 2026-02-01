import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";

// dummy features data
const features = [
  "Competitive Prices & Easy Shopping",
  "Premium Quality & Elegant Packaging",
  "Perfect for Every Occasion",
  "Fast & Reliable Delivery",
];

// dummy images data
const images = {
  main: "/assets/mainAbout.png",
  small: ["/assets/About2.png", "/assets/About3.png"],
};

// component
export default function About() {
  return (
    <section className=" grid grid-cols-2 gap-4 px-7 py-20">
      {/* Images Section */}
      <div className="flex items-start gap-4">
        {/* Main Image with Frame */}
        <div className="relative h-[21.5rem] w-[18.9rem] flex-shrink-0">
          {/* Background Frame */}
          <div className="absolute left-0 top-0 z-0 h-[22.7rem] w-[17rem] rotate-[3.09deg] rounded-[50px_120px_120px_120px] border-4 border-maroon-600" />

          {/* Main Image */}
          <div className="relative left-7 top-6 z-10 h-[21rem] w-[19rem]">
            <Image
              src={images.main}
              alt="Main gift box"
              fill
              priority
              className="rounded-[50px_120px_120px_120px] object-cover"
            />
          </div>
        </div>

        {/* Small Images */}
        <div className="mt-2 flex flex-col gap-2 pl-5">
          {images.small.map((src, index) => (
            <div
              key={index}
              className={`relative overflow-hidden ${
                index === 0 ? "h-48 w-48" : "h-36 w-48"
              }`}
            >
              <Image
                src={src}
                alt={`Small gift`}
                fill
                className={`object-cover ${
                  index === 1 ? "rounded-[3rem_6rem_6rem_3rem]" : "rounded-full"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-center space-y-4">
        {/* Heading */}
        <div>
          <h2 className="pb-4 text-sm font-bold uppercase tracking-[0.25em] text-softPink-500 dark:text-maroon-400">
            About
          </h2>

          <h3 className="mb-2 text-3xl font-bold leading-none text-maroon-700 dark:text-softPink-200">
            Delivering the
            <span className="text-softPink-500 dark:text-maroon-400">
              {" "}
              Finest
            </span>{" "}
            Gift Boxes for Your
            <span className="text-softPink-500 dark:text-maroon-400">
              {" "}
              Special{" "}
            </span>{" "}
            Moments
          </h3>

          <p className="text-base leading-none text-zinc-500 dark:te">
            Make every moment memorable with our premium gift boxes. Carefully
            curated and beautifully packaged, each box is filled with handpicked
            items designed to impress. Whether it's for a birthday, wedding, or
            a simple “thank you,” our gift boxes are crafted to leave a lasting
            impression — because thoughtful gifting starts here.
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <Link
            href="/products"
            className="flex w-fit items-center gap-3 rounded-lg bg-maroon-600 dark:bg-softPink-200 px-6 py-2 text-white dark:text-zinc-800"
          >
            <span className="text-sm font-semibold">Discover</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Features List */}
        <ul className="grid grid-cols-2 gap-x-8 gap-y-4 pt-4">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-50"
            >
              <Check className="h-4 w-4 stroke-[3px] text-maroon-700 dark:text-softPink-400" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
