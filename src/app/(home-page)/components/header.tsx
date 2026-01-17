import Image from "next/image";
import logo from "../../../../public/images/logo 1.svg";
import { Bell, Heart, ShoppingCart, User } from "lucide-react";
import Navbar from "./navbar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/tailwind-merge";

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
      <Bell
        key="bell-icon"
        className="text-zinc-700 text-sm font-normal cursor-pointer dark:text-zinc-50"
        width={24}
        height={24}
      />,
    ],
  },
  { text: "العربية" },
];

export default function Header() {
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
                  index === 1 && "border-x h-12 dark:border-x-zinc-700"
                )}
              >
                {item.icons
                  ? item.icons.map((icon, iconIndex) => (
                      <span key={iconIndex}>{icon}</span>
                    ))
                  : null}
                {item.text ? <span>{item.text}</span> : null}
              </li>
            ))}
          </ul>
        </div>
      </header>
      <Navbar />
    </>
  );
}
