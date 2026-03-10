"use client";

import Image from "next/image";
import logo from "@public/images/logo1.svg";
import { Heart, ShoppingCart, User } from "lucide-react";
import Navbar from "./navbar";
import { cn } from "@/lib/utils/tailwind-merge";
import Notifications from "@/components/skeletons/notifications/Notifications";
import ToggleLanguage from "@/components/features/toggle-language";
import LoginPopup from "@/components/skeletons/login-popup/login-popup";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { useGetCart } from "../../products/[id]/_hooks/use-get-cart";
import SearchModule from "./search-component/module";
import { useSession } from "next-auth/react";

export default function Header() {
  const { cart } = useGetCart();

  const { data: session } = useSession();
  const isLoggedIn = !!session;

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
      text: isLoggedIn ? "profile" : "login",
      link: isLoggedIn ? "/profile" : "/login",
    },
    {
      icons: [
        <Heart
          key="heart-icon"
          className="text-zinc-700 text-sm font-normal cursor-pointer dark:text-zinc-50"
          width={24}
          height={24}
        />,
        <div className="relative" key="cart">
          <Link href="/cart">
            <ShoppingCart
              key="cart-icon"
              className="text-zinc-700 text-sm font-normal cursor-pointer dark:text-zinc-50 mx-2"
              width={24}
              height={24}
            />
          </Link>
          <p className="absolute w-5 h-5 rounded-full bg-red-600 text-center text-white -top-[0.82rem] right-0">
            {cart?.numOfCartItems}
          </p>
        </div>,
        <Notifications key="notifications" />,
      ],
    },
  ];

  // state to manage login popup visibility
  const [isLoginHovered, setIsLoginHovered] = useState(false);

  return (
    <>
      <header className="px-5 flex items-center justify-between py-2 text-sm">
        <div className="logo mr-2">
          <Image src={logo} alt="Rose Logo" width={85} height={80} />
        </div>

        <div className="flex-1 flex items-center">
          <SearchModule />

          <ul className="flex items-center ms-2">
            {headerList.map((item, index) => (
              <li
                key={index}
                className={cn(
                  "flex items-center gap-1 px-3 cursor-pointer",
                  index === 1 && "border-x h-12 relative dark:border-x-zinc-700"
                )}
              >
                {item.text === "login" && !isLoggedIn ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsLoginHovered(true)}
                    onMouseLeave={() => setIsLoginHovered(false)}
                  >
                    <Link
                      href={item.link}
                      className="flex items-center gap-1 cursor-pointer"
                    >
                      {item.icons?.map((icon, i) => (
                        <span key={i}>{icon}</span>
                      ))}
                      <span>{item.text}</span>
                    </Link>

                    {isLoginHovered && (
                      <div className="absolute top-full end-0 z-50">
                        <LoginPopup />
                      </div>
                    )}
                  </div>
                ) : item.text === "profile" && isLoggedIn ? (
                  <Link
                    href={item.link}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    {item.icons?.map((icon, i) => (
                      <span key={i}>{icon}</span>
                    ))}
                    <span>{item.text}</span>
                  </Link>
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
