"use client";
import Image from "next/image";
import logo from "../../../../../public/images/logo1.svg";
import { Heart, ShoppingCart, User } from "lucide-react";
import Navbar from "./navbar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/tailwind-merge";
import Notifications from "@/components/skeletons/notifications/Notifications";
import ToggleLanguage from "@/components/features/toggle-language";
import LoginPopup from "@/components/skeletons/login-popup/login-popup";
import { useState } from "react";
import { Link } from "@/i18n/navigation";

const headerList = [
  {
    icons: [
      <User
        key="user-icon"
        className="text-zinc-700 text-sm font-normal cursor-pointer dark:text-zinc-50"
        width={24}
        height={24}
      />,
    ],
    text: "login",
  },
  {
    icons: [
      <Heart
        key="heart-icon"
        className="text-zinc-700 text-sm font-normal cursor-pointer dark:text-zinc-50"
        width={24}
        height={24}
      />,
      <ShoppingCart
        key="cart-icon"
        className="text-zinc-700 text-sm font-normal cursor-pointer dark:text-zinc-50 mx-2"
        width={24}
        height={24}
      />,
      // noftification feat
      <Notifications />,
    ],
  },
];

export default function Header() {
  // state to manage login popup visibility
  const [isLoginHovered, setIsLoginHovered] = useState(false);

  return (
    <>
      <header className="px-5 flex items-center justify-between py-2 text-sm ">
        <div className="logo mr-2">
          <Image src={logo} alt="Rose Logo" width={85} height={80} />
        </div>
        <div className="flex-1 flex items-center">
          <Input
            type="text"
            search={true}
            placeholder="What awesome gift are you looking for?"
          />
          <ul className="flex items-center ms-2 ">
            {headerList.map((item, index) => (
              <li
                key={index}
                className={cn(
                  "flex items-center gap-1 px-3 cursor-pointer",
                  index === 1 && "border-x h-12 relative dark:border-x-zinc-700"
                )}
              >
                {item.text === "login" ? (
                  <div
                    onMouseEnter={() => setIsLoginHovered(true)}
                    onMouseLeave={() => setIsLoginHovered(false)}
                    className="relative"
                  >
                    <Link href="/login" className="flex items-center gap-1">
                      {item.icons
                        ? item.icons.map((icon, iconIndex) => (
                            <span key={iconIndex}>{icon}</span>
                          ))
                        : null}
                      {item.text ? <span>{item.text}</span> : null}
                    </Link>
                    {isLoginHovered && (
                      <div className="absolute  mt-2 w-72 -translate-y-[14%] top-0 end-0 z-50">
                        <LoginPopup />
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    {item.icons
                      ? item.icons.map((icon, iconIndex) => (
                          <span key={iconIndex}>{icon}</span>
                        ))
                      : null}
                    {item.text ? <span>{item.text}</span> : null}
                  </>
                )}
              </li>
            ))}
            <li className="px-3">
              <ToggleLanguage />
            </li>
          </ul>
        </div>
      </header>
      <Navbar />
    </>
  );
}
