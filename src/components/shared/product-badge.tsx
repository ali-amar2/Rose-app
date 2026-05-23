import { Badge } from "@/components/ui/badge";
import { ProductBadgeProps } from "@/lib/types/product";
import { useTranslations } from "next-intl";

export default function ProductBadge({
  quantity,
  sold = 0,
  createdAt,
}: ProductBadgeProps) {
  // Translations
  const t = useTranslations("product.badge");

  // Variables
  const isOutOfStock = quantity <= 0;
  const isHot = sold >= 30;
  const createdDate = new Date(createdAt!);
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const isNew = diffInDays <= 30;

  return (
    <div className="absolute right-2 top-2 z-10 flex flex-wrap gap-1">
      {isNew && !isOutOfStock && <Badge variant="new">{t("new")}</Badge>}

      {isHot && <Badge variant="hot">{t("hot")} 🔥</Badge>}

      {isOutOfStock && <Badge variant="outOfStock">{t("out-of-stock")}</Badge>}
    </div>
  );
}
