"use client";

import Link from "next/link";
import { cn } from "@/lib/utils/tailwind-merge";
import {
  LayoutDashboard,
  ClipboardList,
  CalendarHeart,
  Package,
} from "lucide-react";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

const NavItems = [
  { key: "overview", href: "/dashboard", icon: LayoutDashboard },
  { key: "categories", href: "/dashboard/categories", icon: ClipboardList },
  { key: "occasions", href: "/dashboard/occasions", icon: CalendarHeart },
  { key: "products", href: "/dashboard/products", icon: Package },
];

export default function SidebarLinks() {
  // Traanslations
  const t = useTranslations("dashboard.sidebar");

  // Hooks
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-3">
      {NavItems.map((item) => {
        const Icon = item.icon;
        const isActive = (pathname: string, href: string) =>
          pathname === href || pathname.startsWith(href + "/");
        return (
          <Link
            key={item.key}
            href={item.href}
            className={cn(
              "flex items-center gap-3 p-2 rounded font-medium transition-colors",
              isActive(pathname, item.href)
                ? "bg-maroon-50 text-maroon-600"
                : "text-zinc-800 hover:bg-zinc-50 hover:text-zinc-900"
            )}
          >
            <Icon className="w-5 h-5" />
            <span>{t(item.key)}</span>
          </Link>
        );
      })}
    </nav>
  );
}
