import React from "react";
import { Truck, ShieldCheck, RefreshCcw, Headset } from "lucide-react";
import { useTranslations } from "next-intl";

const specs = [
  {
    icon: <Truck size={28} strokeWidth={1.8} />,
    titleKey: "freeDelivery.title",
    subKey: "freeDelivery.sub",
  },
  {
    icon: <RefreshCcw size={28} strokeWidth={1.8} />,
    titleKey: "refund.title",
    subKey: "refund.sub",
  },
  {
    icon: <ShieldCheck size={28} strokeWidth={1.8} />,
    titleKey: "safePayment.title",
    subKey: "safePayment.sub",
  },
  {
    icon: <Headset size={28} strokeWidth={1.8} />,
    titleKey: "support.title",
    subKey: "support.sub",
  },
];

export default function SpecificationsComponent() {
  const t = useTranslations("specs");

  return (
    <section aria-label={t("aria")} className="w-full">
      <div className="grid grid-cols-1 gap-3 rounded-2xl bg-[#FDF0F0] p-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4 lg:p-6 dark:bg-zinc-800">
        {specs.map((item, index) => (
          <article
            key={index}
            className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md dark:bg-zinc-900"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#A12525] text-white dark:bg-pink-200 dark:text-red-900">
              {item.icon}
            </div>

            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-[#A12525] sm:text-base dark:text-pink-200">
                {t(item.titleKey)}
              </h3>

              <p className="mt-1 text-xs leading-relaxed text-zinc-500 sm:text-sm dark:text-zinc-300">
                {t(item.subKey)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
