import React from "react";
import OrdersStatus from "./_components/orders-status";
import Revenue from "./_components/revenue";

export default function page() {
  return (
    <div className="flex items-center justify-center w-[68rem] mx-auto ">
      <OrdersStatus />
      <Revenue />
    </div>
  );
}
