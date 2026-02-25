import React from "react";

export default function StatusPercentage() {
  return (
    <g>
      <text
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-white text-xs font-semibold"
      >
        {(50 * 100).toFixed(0)}%
      </text>
    </g>
  );
}
