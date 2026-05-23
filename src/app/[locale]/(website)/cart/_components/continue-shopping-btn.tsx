import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { MoveLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

export default function ContinueShoppingBtn() {
  // Translations
  const t = useTranslations("cart");

  return (
    <>
      <Button asChild size="lg" className="mt-8 rounded-xl px-8">
        <Link
          href="/products"
          aria-label={t("continue-shopping")}
          className="flex items-center gap-2"
        >
          <MoveLeft size={18} />
          {t("continue-shopping")}
        </Link>
      </Button>
    </>
  );
}
