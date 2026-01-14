import { RouteProps } from "@/lib/types/global";
import { getTranslations } from "next-intl/server";
import { Testimonials } from "./_components/Testimonials";

export async function generateMetadata({ params: { locale } }: RouteProps) {
  const t = await getTranslations({ locale });

  return {
    title: t("home"),
  };
}

export default function Home() {
  return (
    <main className="">
      <Testimonials />
      <div className=""></div>
    </main>
  );
}
