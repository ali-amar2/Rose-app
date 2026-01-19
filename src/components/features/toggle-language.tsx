"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import React from "react";

export default function ToggleLanguage() {
  // translations hook
  const locale = useLocale();

  // navigation hooks
  const router = useRouter();
  const pathname = usePathname();

  function toggleLocale() {
    // Toggle between 'ar' and 'en'
    router.push(
      {
        pathname,
        query: Object.fromEntries(
          new URLSearchParams(location.search).entries()
        ),
      },
      {
        locale: locale === "ar" ? "en" : "ar",
      }
    );
  }
  return (
    // #TODO: Style the button
    <button
      onClick={toggleLocale}
      className="text-white bg-red-600 px-5 flex justify-center items-center "
    >
      {locale === "ar" ? "English" : "العربية"}
    </button>
  );
}
