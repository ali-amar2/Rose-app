import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Sarabun, Tajawal } from "next/font/google";
import { setRequestLocale } from "next-intl/server";
import Header from "./(homepage)/_components/header";
import Footer from "./(homepage)/_components/footer";
import { cn } from "@/lib/utils/tailwind-merge";

const sarabun = Sarabun({
  subsets: ["latin"],
  variable: "--font-sarabun",
  weight: ["400", "500", "600", "700"],
});

const tajawal = Tajawal({
  subsets: ["latin"],
  variable: "--font-tajawal",
  weight: ["400", "500", "700", "800", "900"],
});

type LayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <div
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={cn(
        sarabun.className,
        sarabun.variable,
        tajawal.variable,
        "antialiased dark:bg-zinc-800 min-h-screen flex flex-col"
      )}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
}