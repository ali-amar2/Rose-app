import {
  CreditCard,
  Banknote,
  Truck,
  TriangleAlert,
  CheckCheck,
} from "lucide-react";
import { useTranslations } from "next-intl";

const paymentConfig: Record<
  PaymentType,
  { label: string; Icon: React.ElementType }
> = {
  cash: {
    label: "Cash",
    Icon: Banknote,
  },
  credit_card: {
    label: "Credit Card",
    Icon: CreditCard,
  },
};

const deliveryConfig: Partial<
  Record<OrderState, { label: string; Icon: React.ElementType; color: string }>
> = {
  pending: {
    label: "Pending",
    Icon: Truck,
    color: "text-yellow-600",
  },
  canceled: {
    label: "Canceled",
    Icon: TriangleAlert,
    color: "text-maroon-500",
  },
  delivered: {
    label: "Delivered",
    Icon: CheckCheck,
    color: "text-emerald-600",
  },
};

export default function OrderPaymentInfo({
  paymentType,
  state,
}: OrderPaymentInfoProps) {
  //Translation
  const t = useTranslations("orders");
  // Variables
  const payment = paymentConfig[paymentType];
  const delivery = deliveryConfig[state];

  return (
    <div className="text-sm">
      {/* Payment Method */}
      <div className="flex items-center gap-2">
        <span className="font-medium">{t("payment.method")}:</span>

        <div className="flex items-center gap-1 text-zinc-500">
          <payment.Icon size={16} />
          <span>{payment.label}</span>
        </div>
      </div>

      {/* Delivery Status */}
      {delivery && (
        <div className="flex items-center gap-2 mt-1">
          <span className="font-medium">{t("delivery.status")}:</span>

          <div className={`flex items-center gap-1 ${delivery.color}`}>
            <delivery.Icon size={16} />
            <span>{delivery.label}</span>
          </div>
        </div>
      )}
    </div>
  );
}
