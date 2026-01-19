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
      <h2 className="font-bold text-pink-500 uppercase">{title}</h2>
      <div className="relative">
        <p className="font-bold text-4xl text-[#741C21]">{subtitle}</p>
        {/*  */}
        <div className="h-[2px] w-[28%] bg-pink-600"></div>
        {/* #TODO : Add bacckground color */}
        <div className="absolute bottom-0 left-0 w-[72%] h-4 bg-[#FFE0E7] -z-10 rounded-r-2xl"></div>
      </div>
    </div>
  );
}
