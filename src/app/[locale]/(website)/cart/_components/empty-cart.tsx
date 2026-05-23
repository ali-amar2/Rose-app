import Image from "next/image";
import { useTranslations } from "next-intl";
import ContinueShoppingBtn from "./continue-shopping-btn";

export default function EmptyCart() {
  // Translations
  const t = useTranslations("cart");

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-10 text-center">
      {/* Empty cart Header  */}
      <header className="space-y-2">
        <div className="flex items-end justify-center gap-3">
          <h1 className="text-3xl font-bold text-maroon-600 sm:text-4xl lg:text-5xl">
            {t("title")}
          </h1>
          <span className="pb-1 text-sm text-zinc-400">0 {t("products")}</span>
        </div>

        <p className="max-w-md text-sm leading-relaxed text-zinc-500 sm:text-base">
          {t("empty-cart")}
        </p>
      </header>

      {/* Empty cart Image */}
      <div className="relative mt-8 h-52 w-52 sm:h-64 sm:w-64 lg:h-72 lg:w-72">
        <Image
          src="/assets/p0.png"
          alt="Empty shopping cart illustration"
          fill
          priority
          sizes="(max-width: 640px) 208px, (max-width: 1024px) 288px, 320px"
          className="object-contain"
        />
      </div>

      <ContinueShoppingBtn />
    </section>
  );
}
