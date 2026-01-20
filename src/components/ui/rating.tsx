import { Star } from "lucide-react";
import React from "react";

export default function Rating() {
  return (
    <span className="flex items-center gap-1 w-20 mb-1">
      {[1, 2, 3, 4].map((i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${
            i <= 3 ? "fill-amber-500 text-amber-500" : "text-gray-300"
          }`}
        />
      ))}
    </span>
  );
}
