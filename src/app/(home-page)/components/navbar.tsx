"use client";
import {
  ClipboardList,
  Gift,
  Headset,
  Home,
  Info,
  PartyPopper,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navItems = [
  {
    text: "Home",
    href: "/",
    icon: <Home />,
  },
  {
    text: "Products",
    href: "/products",
    icon: <Gift />,
  },
  {
    text: "Categories",
    href: "/categories",
    icon: <ClipboardList />,
  },
  {
    text: "Occasions",
    href: "/occasions",
    icon: <PartyPopper />,
  },
  {
    text: "Contact",
    href: "/contact",
    icon: <Headset />,
  },
  {
    text: "About",
    href: "/about",
    icon: <Info />,
  },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav className="dark:bg-softPink-200 dark:text-zinc-800 bg-maroon-700 text-zinc-50 h-11 py-3 px-5 shadow-md mb-4 text-[16px]">
      <ul className="flex items-center justify-center gap-8 ">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <li
              key={index}
              className={`${isActive && `border-b-2 border-zinc-50 dark:border-zinc-800  font-semibold`} hover:border-b-2 hover:border-zink-50 dark:hover:border-zinc-800 hover:font-semibold transition-all  pb-1`}
            >
              <Link className="flex items-center gap-2" href={item.href}>
                {item.icon} {item.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
