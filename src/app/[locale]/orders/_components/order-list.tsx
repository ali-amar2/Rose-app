"use client";
import Loading from "@/app/loading";
import { useOrders } from "@/hooks/use-orders";
import OrderCard from "./order-card";
import { useTranslations } from "next-intl";

export default function OrderList() {
  // Translation
  const t = useTranslations("orders");
  // States
  const { data, isLoading, isError } = useOrders();

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <p className="flex justify-center items-center text-maroon-600 text-lg py-5">
        {t("error-loading-orders")}
      </p>
    );

  if (!data?.orders?.length)
    return (
      <p className="flex justify-center items-center text-maroon-600 text-lg py-5">
        {t("no-orders-found")}
      </p>
    );
  return (
    <div className="space-y-4">
      {data.orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
}
