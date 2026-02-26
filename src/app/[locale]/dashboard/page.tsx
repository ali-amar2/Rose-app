import React from "react";
import OrdersStatus from "./_components/orders-status";
import Revenue from "./_components/revenue";
import DashboardStats from "./_components/statistics";

export default function page() {
  return (
    <div className="flex items-center">
       <DashboardStats/>
      <OrdersStatus />
      <Revenue />
    </div>
  );
}
