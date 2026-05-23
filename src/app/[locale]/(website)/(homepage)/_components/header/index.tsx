"use client";

import Image from "next/image";
import logo from "@public/images/logo1.svg";
import {
  Heart,
  Loader,
  Loader2,
  MapPinPen,
  Menu,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import Navbar from "../navbar";
import Notifications from "@/components/skeletons/notifications/Notifications";
import ToggleLanguage from "@/components/features/toggle-language";
import LoginPopup from "@/components/skeletons/login-popup/login-popup";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useGetCart } from "../../../../../../hooks/use-get-cart";
import { DeliveryLocationDialog } from "@/app/[locale]/checkout/_components/address-dialog";
import { Address } from "@/lib/types/address";
import { useTranslations } from "next-intl";
import SearchModule from "../search-component/module";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";

interface HeaderProps {
  session: Session | null;
}

export default function Header({ session }: HeaderProps) {
  const t = useTranslations("header");

  const { cart } = useGetCart();

  const isLoggedIn = !!session;

  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [currentCity, setCurrentCity] = useState("Cairo");
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedAddress = localStorage.getItem("selectedAddress");

    if (savedAddress) {
      const parsedAddress = JSON.parse(savedAddress);
      setSelectedAddress(parsedAddress);
      setCurrentCity(parsedAddress.city);
    }
  }, []);

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
    setCurrentCity(address.city);

    localStorage.setItem("selectedAddress", JSON.stringify(address));
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-[100] border-b border-zinc-200 bg-white/95 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/95">
        <div className="mx-auto flex min-h-[72px] w-full items-center justify-between gap-3 px-4 lg:px-6">
          <div className="flex items-center gap-2 lg:gap-4">
            <button
              aria-label={t("toggleMenu")}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white transition-all hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 lg:hidden"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link href="/" className="shrink-0">
              <Image
                src={logo}
                alt={t("logoAlt")}
                width={85}
                height={80}
                priority
                className="h-auto w-[72px] object-contain sm:w-[85px]"
              />
            </Link>

            {/* Delivery Location */}
            <div className="hidden md:block">
              <button
                className="flex max-w-[190px] flex-col rounded-2xl px-3 py-2 text-start transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800"
                onClick={() => setIsLocationDialogOpen(true)}
              >
                <p className="text-xs font-normal text-zinc-500">
                  {t("deliverTo")}
                </p>

                <span className="flex items-center gap-1 truncate text-sm font-medium text-maroon-700 dark:text-maroon-400">
                  <MapPinPen size={16} />

                  <span className="truncate">
                    {selectedAddress?.city || currentCity}
                  </span>
                </span>
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="hidden max-w-2xl flex-1 lg:flex">
            <SearchModule />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Auth */}
            <div
              className="relative"
              onMouseEnter={() => setIsLoginHovered(true)}
              onMouseLeave={() => setIsLoginHovered(false)}
            >
              <Link
                href={isLoggedIn ? "/profile" : "/login"}
                className="flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-medium capitalize text-zinc-700 transition-all hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800"
              >
                <User width={22} height={22} />

                <span className="hidden sm:block">
                  {isLoggedIn ? t("profile") : t("login")}
                </span>
              </Link>

              {!isLoggedIn && isLoginHovered && (
                <div className="absolute end-0 top-full z-50 pt-2">
                  <LoginPopup />
                </div>
              )}
            </div>

            {/* Icons */}
            <div className="flex items-center gap-1 border-s border-zinc-200 ps-2 dark:border-zinc-700 sm:gap-2 sm:ps-3">
              <Link
                href="/wishlist"
                className="rounded-xl p-2 hover:bg-zinc-100"
              >
                <Heart width={22} height={22} />
              </Link>

              <div className="relative">
                <Link
                  href="/cart"
                  className="flex rounded-xl p-2 hover:bg-zinc-100"
                >
                  <ShoppingCart width={22} height={22} />
                </Link>

                <span className="absolute -end-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-semibold text-white">
                  {cart?.numOfCartItems ?? (
                    <Loader2 className="animate-spin" size={10} />
                  )}
                </span>
              </div>

              <Notifications />
            </div>

            <ToggleLanguage />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="px-4 pb-3 lg:hidden">
          <SearchModule />
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <div className="absolute left-0 top-0 z-50 w-full bg-white px-4 py-4 shadow-2xl dark:bg-zinc-950 lg:hidden">
              <div className="mb-4 flex items-center justify-between">
                <Button
                  variant="inactive"
                  aria-label={t("closeMenu")}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <X size={20} />
                </Button>
              </div>

              <Navbar
                mobile
                onItemClick={() => setIsMobileMenuOpen(false)}
                locationLabel={selectedAddress?.city || currentCity}
                onLocationClick={() => {
                  setIsLocationDialogOpen(true);
                  setIsMobileMenuOpen(false);
                }}
              />
            </div>
          </>
        )}
      </header>

      <div className="hidden lg:block">
        <Navbar />
      </div>

      <DeliveryLocationDialog
        open={isLocationDialogOpen}
        onOpenChange={setIsLocationDialogOpen}
        onSelectAddress={handleSelectAddress}
      />
    </>
  );
}
