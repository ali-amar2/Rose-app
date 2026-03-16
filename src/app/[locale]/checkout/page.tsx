import { Metadata } from "next";
import React from "react";
import StepsFlow from "./_components/steps-flow";
import Summary from "@/components/shared/summary";

export const metadata: Metadata = {
  title: "Checkout Page",
};

export default function page() {
  return (
    <div className="flex justify-center pt-8 pb-16">
      <div className="container">
        <div className="grid grid-cols-12 gap-5">
          {/* left section */}
          <StepsFlow />
          <div className="col-span-4">
            {/* right section */}
            <Summary />
          </div>
        </div>
      </div>
    </div>
  );
}
