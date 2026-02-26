import React from "react";
import OrdersStatus from "./_components/orders-status";
import Revenue from "./_components/revenue";
import TopSelling from "./_components/top-selling";
import LowStock from "./_components/low-stock";

export default function page() {
  return (
    <div className="">
      <div className="flex items-center ">
        <OrdersStatus />
        <Revenue />
      </div>
      <div className="flex items-center gap-6 justify-center pb-3">
        <TopSelling></TopSelling>
        <LowStock></LowStock>
      </div>
    </div>
  );
}
