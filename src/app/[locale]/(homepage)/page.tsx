import { RouteProps } from "@/lib/types/global";
import { getTranslations } from "next-intl/server";
import { Testimonials } from "./_components/Testimonials";

export async function generateMetadata({ params: { locale } }: RouteProps) {
  // translation function
  const t = await getTranslations({ locale });

  return {
    title: t("home"),
  };
}

export default function Home() {
  return (
    <main className="">
      <Testimonials />
    </main>
  );
}
