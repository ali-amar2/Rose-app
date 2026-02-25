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

const NavItems = [
  { name: "Overview", href: "/dashboard/overview", icon: LayoutDashboard },
  { name: "Categories", href: "/dashboard/categories", icon: ClipboardList },
  { name: "Occasions", href: "/dashboard/occasions", icon: CalendarHeart },
  { name: "Products", href: "/dashboard/products", icon: Package },
];

export default function SidebarLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col space-y-3">
      {NavItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname.endsWith(item.href);
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 p-2 rounded font-medium transition-colors",
              isActive
                ? "bg-maroon-50 text-maroon-600"
                : "text-zinc-800 hover:bg-zinc-50 hover:text-zinc-900"
            )}
          >
            <Icon className="w-5 h-5" />
            <span>{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
