"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

type Props = {
  customLast?: string;
};

export default function DashboardBreadcrumb({ customLast }: Props) {
  //Locale
  const locale = useLocale();
  // Hooks
  const pathname = usePathname();
  // Constants
  let segments = pathname.split("/").filter(Boolean);

  if (segments[0] === locale) segments = segments.slice(1);

  // Function to format any segment into Capitalized Words
  const formatSegment = (segment: string) => {
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="flex items-center gap-2 p-5 border border-zinc-100">
      {segments.map((segment, index) => {
        const href = `/${locale}/` + segments.slice(0, index + 1).join("/");
        const isLast = index === segments.length - 1;

        return (
          <span key={href} className="flex items-center gap-2">
            {isLast ? (
              <span className="text-maroon-600">
                {customLast ?? formatSegment(segment)}
              </span>
            ) : (
              <>
                <Link
                  href={href}
                  className="text-gray-500 hover:text-maroon-600 transition-colors"
                >
                  {formatSegment(segment)}
                </Link>
                <span className="text-gray-400">{">"}</span>
              </>
            )}
          </span>
        );
      })}
    </div>
  );
}
