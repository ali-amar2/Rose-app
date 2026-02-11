const statusStyles: Record<string, string> = {
  pending: "bg-blue-500",
  done: "bg-emerald-500",
  canceled: "bg-red-600",
};

export default function OrderStatusBadge({ state }: OrderStatusBadgeProps) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-white text-sm capitalize ${
        statusStyles[state] || "bg-blue-500"
      }`}
    >
      {state}
    </span>
  );
}
