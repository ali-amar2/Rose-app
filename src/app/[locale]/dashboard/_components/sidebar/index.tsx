"use client";
import Image from "next/image";
import LogoImage from "@public/images/logo1.svg";
import Link from "next/link";
import { Flower } from "lucide-react";
import SidebarLinks from "./sidebar-links";
import { SidebarDropdown } from "./sidebar-dropdown";
import UserAvatar from "./user-avatar";
import { useCurrentUser } from "../../_hooks/use-current-user";

export default function DashboardSidebar() {
  //States
  const { user } = useCurrentUser();

  return (
    <div className="flex flex-col pt-8 pb-4 px-4 w-full h-full justify-between">
      <div className="flex flex-col">
        <Image
          src={LogoImage}
          alt="Rose App Logo"
          width={150}
          height={0}
          className="m-auto"
        />
        <Link
          href="/"
          className="flex items-center justify-center my-4 p-3 bg-maroon-600 text-white rounded-md hover:bg-maroon-700 transition-colors"
        >
          <Flower className="mr-2" /> Preview website
        </Link>
        <SidebarLinks />
      </div>
      <div className="flex gap-2 justify-center items-center">
        <div className="w-11 h-11 rounded-full">
          <UserAvatar user={user} />
        </div>
        <div className="flex flex-col text-sm">
          <span className="text-zinc-800 flex gap-1 font-bold ">
            <span>{user?.firstName}</span>
            <span>{user?.lastName}</span>
          </span>
          <span className="text-[#2E2E3080]">{user?.email}</span>
        </div>
        <SidebarDropdown user={user} />
      </div>
    </div>
  );
}
