import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-4 text-center">
      <div className="relative w-full max-w-md h-full">
        <Image
          src="/assets/404.jpg"
          width={400}
          height={0}
          alt="404 Not Found"
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div>
        <p className="text-3xl font-semibold mb-4">{t("title")}</p>
        <p className="text-lg font-normal text-zinc-400  dark:text-gray-400 space-y-4 leading-[1.5]">
          {t("description")}
        </p>
      </div>
    </div>
  );
}
