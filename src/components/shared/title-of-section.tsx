import React from "react";
import { cn } from "@/lib/utils/tailwind-merge";

type TitleOfSectionProps = {
  title?: string;
  subtitle: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
};

export default function TitleOfSection({
  title,
  subtitle,
  className,
  subtitleClassName,
}: TitleOfSectionProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center py-6 sm:py-8 text-center",
        className
      )}
    >
      {title && (
        <h2
          className={cn(
            "font-bold uppercase text-xs sm:text-sm tracking-wider text-softPink-500 dark:text-maroon-400"
          )}
        >
          {title}
        </h2>
      )}

      <div className="relative w-fit">
        <p
          className={cn(
            "font-bold text-2xl sm:text-3xl lg:text-4xl text-maroon-700 dark:text-softPink-200 leading-tight",
            subtitleClassName
          )}
        >
          {subtitle}
        </p>

        {/* underline */}
        <div className="h-0.5 w-1/3 bg-softPink-600 mt-2 mx-auto" />

        {/* background highlight */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-3 sm:h-4 bg-softPink-100 dark:bg-zinc-700 -z-10 rounded-r-2xl" />
      </div>
    </div>
  );
}
