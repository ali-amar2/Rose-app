"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function ToggleLanguage() {
  const locale = useLocale();

  const router = useRouter();
  const pathname = usePathname();

  function toggleLocale() {
    const newLocale = locale === "ar" ? "en" : "ar";

    router.replace(pathname, {
      locale: newLocale,
    });

    router.refresh();
  }

  return (
    <button
      onClick={toggleLocale}
      className="text-zinc-700 transition-colors hover:text-maroon-700 dark:text-zinc-50"
    >
      {locale === "ar" ? "English" : "العربية"}
    </button>
  );
}
