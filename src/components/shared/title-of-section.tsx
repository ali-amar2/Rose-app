import React from "react";

type TitleOfSectionProps = {
  // Define the props type
  title?: string;
  subtitle: string;
};

export default function TitleOfSection({
  title,
  subtitle,
}: TitleOfSectionProps) {
  return (
    <div className="flex flex-col items-center py-8">
      {/* #TODO : Add text color */}
      <h2 className="font-bold text-softPink-500 dark:text-maroon-400 uppercase">{title}</h2>
      <div className="relative">
        <p className="font-bold text-4xl text-maroon-700 dark:text-softPink-200">{subtitle}</p>
        <div className="h-[2px] w-[28%] bg-softPink-600 dark:bg-softPink-600"></div>
        <div className="absolute bottom-0 left-0 w-[72%] h-4 bg-softPink-100 dark:bg-zinc-700 -z-10 rounded-r-2xl"></div>
      </div>
    </div>
  );
}
