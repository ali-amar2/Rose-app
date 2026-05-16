import Image from "next/image";
import Link from "next/link";
import logo from "@public/images/logo1.svg";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const footerItems = [
  { key: "home", href: "/" },
  { key: "products", href: "/products" },
  { key: "categories", href: "/categories" },
  { key: "occasions", href: "/occasions" },
  { key: "contact", href: "/contact" },
  { key: "about", href: "/about" },
  { key: "terms", href: "/terms" },
  { key: "privacy", href: "/privacy" },
  { key: "faqs", href: "/faqs" },
];

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="bg-zinc-800 dark:bg-zinc-900 px-5">
      <div className="container mx-auto w-full px-4 sm:px-6 lg:px-10 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-start">
            <Image
              src={logo}
              alt="Rose Logo"
              width={200}
              height={180}
              className="my-2 h-auto w-40"
            />

            <h3 className="text-softPink-300 font-bold text-lg">
              {t("logoTitle")}
            </h3>

            <p className="text-zinc-100 text-sm mt-2">{t("rights")}</p>
          </div>

          {/* Links */}
          <div className="flex flex-col">
            <h3 className="text-softPink-300 font-bold text-lg mb-3">
              {t("discoverTitle")}
            </h3>

            <ul className="flex flex-col">
              {footerItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-zinc-100 text-sm hover:text-softPink-200 transition"
                  >
                    {t(`items.${item.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empty column (kept for layout balance on desktop) */}
          <div className="hidden lg:block" />

          {/* Newsletter */}
          <div className="flex flex-col">
            <h3 className="text-softPink-300 font-semibold text-lg">
              {t("newsletter.title")}
            </h3>

            <p className="text-zinc-400 text-sm mt-1">
              {t("newsletter.subtitle")}
            </p>

            <div className="mt-4 flex w-full max-w-sm overflow-hidden rounded-full bg-zinc-600">
              <input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="flex-1 bg-transparent px-4 py-2 text-sm text-white outline-none placeholder:text-zinc-400"
              />

              <button className="flex items-center gap-2 bg-maroon-50 px-4 text-sm text-maroon-700 hover:bg-softPink-200 hover:text-zinc-900 transition">
                {t("newsletter.button")} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
