"use client";

import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils/tailwind-merge";
import {
  ClipboardList,
  Gift,
  Headset,
  Home,
  Info,
  PartyPopper,
  MapPinPen,
} from "lucide-react";
import { useTranslations } from "next-intl";

const navConfig = [
  {
    key: "home",
    href: "/",
    icon: <Home size={20} />,
  },
  {
    key: "products",
    href: "/products",
    icon: <Gift size={20} />,
  },
  {
    key: "categories",
    href: "/categories",
    icon: <ClipboardList size={20} />,
  },
  {
    key: "occasions",
    href: "/occasions",
    icon: <PartyPopper size={20} />,
  },
  {
    key: "contact",
    href: "/contact",
    icon: <Headset size={20} />,
  },
  {
    key: "about",
    href: "/about",
    icon: <Info size={20} />,
  },
];

type NavbarProps = {
  mobile?: boolean;
  onItemClick?: () => void;
  locationLabel?: string;
  onLocationClick?: () => void;
};

export default function Navbar({
  mobile = false,
  onItemClick,
  locationLabel,
  onLocationClick,
}: NavbarProps) {
  const pathname = usePathname();
  const t = useTranslations("navbar");

  const cleanPath = pathname.replace(/^\/(en|ar)/, "") || "/";

  return (
    <nav
      className={cn(
        mobile
          ? "w-full"
          : "mb-4 h-11 bg-maroon-700 px-5 py-3 text-base text-zinc-50 shadow-md dark:bg-softPink-200 dark:text-zinc-800"
      )}
    >
      <ul
        className={cn(
          mobile
            ? "flex flex-col gap-2"
            : "flex items-center justify-center gap-8"
        )}
      >
        {/* LOCATION (MOBILE ONLY) */}
        {mobile && locationLabel && (
          <li className="mb-2">
            <button
              onClick={onLocationClick}
              className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-maroon-700 transition-all hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              <MapPinPen size={20} />
              <span className="truncate">{locationLabel}</span>
            </button>
          </li>
        )}

        {navConfig.map((item) => {
          const isActive =
            item.href === "/"
              ? cleanPath === "/"
              : cleanPath.startsWith(item.href);

          return (
            <li key={item.key}>
              <Link
                onClick={onItemClick}
                href={item.href}
                className={cn(
                  mobile
                    ? "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800"
                    : "flex items-center gap-2 border-b-2 border-transparent pb-1 transition-all hover:border-zinc-50 hover:font-semibold dark:hover:border-zinc-800",
                  isActive &&
                    (mobile
                      ? "bg-maroon-700 text-white dark:bg-zinc-800"
                      : "border-zinc-50 font-semibold dark:border-zinc-800")
                )}
              >
                {item.icon}
                <span>{t(item.key)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
