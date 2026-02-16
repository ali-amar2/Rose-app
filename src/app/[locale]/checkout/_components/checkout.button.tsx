import { Button } from "@/components/ui/button";
import { useCheckout } from "@/hooks/use-checkout";
import { MoveRight } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

export default function CheckoutButton({
  street,
  phone,
  city,
  lat,
  long,
}: CheckoutPayload) {
  const t = useTranslations();

  const { checkout } = useCheckout();

  const handleCheckout = () => {
    checkout({ street, phone, city, lat, long });
  };
  return (
    <div className="flex justify-end mt-6">
      <Button
        className="w-40 font-semibold"
        onClick={handleCheckout}
      >
        {t("checkout")} <MoveRight size={20} className="rtl:rotate-180" />
      </Button>
    </div>
  );
}
