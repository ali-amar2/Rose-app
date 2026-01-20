import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Providers from "@/components/providers";
import { Sarabun, Tajawal } from "next/font/google";
import { setRequestLocale } from "next-intl/server";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function LocaleLayout({ children, params }: LayoutProps) {
  // Ensure that the incoming `locale` is valid
  const { locale } = params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body
        className={`${sarabun.className} ${sarabun.variable} ${tajawal.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
