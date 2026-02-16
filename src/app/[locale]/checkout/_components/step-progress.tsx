"use client";

// Types
interface StepProgressProps {
  currentStep: 1 | 2;
  isRTL: boolean;
}

// Component
export function StepProgress({ currentStep, isRTL }: StepProgressProps) {
  const progressWidth = currentStep === 1 ? "25%" : "75%";

  return (
    <div className="relative" dir={isRTL ? "rtl" : "ltr"}>
      {/* Background track */}
      <div className="absolute top-2.5 left-0 right-0 border-4 h-2 bg-gray-200 rounded-full" />

      {/* Progress bar */}
      <div
        className={`absolute top-2.5 h-2 bg-maroon-600 rounded-full transition-all duration-300 ${
          isRTL ? "right-0" : "left-0"
        }`}
        style={{ width: progressWidth }}
      />

      {/* Step circles */}
      <div className="relative flex justify-around px-2">
        <div className="w-7 h-7 rounded-full bg-maroon-600 text-white text-sm flex items-center justify-center font-semibold">
          1
        </div>
        <div
          className={`w-7 h-7 rounded-full text-sm flex items-center justify-center font-semibold ${
            currentStep === 2
              ? "bg-maroon-600 text-white"
              : "bg-zinc-200 text-zinc-500"
          }`}
        >
          2
        </div>
      </div>
    </div>
  );
}