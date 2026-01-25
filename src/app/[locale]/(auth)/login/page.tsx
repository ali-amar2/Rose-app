import { Link } from "@/i18n/navigation";
import LoginForm from "./_components/login-form";
import { useTranslations } from "next-intl";

export default function page() {
  // translation
  const t = useTranslations("login");

  return (
    <main className="flex flex-col justify-center items-center w-full h-screen gap-10">
      <LoginForm />
      <div className="flex gap-2 justify-center border-t border-zinc-200 border-solid pt-5">
        <p className="text-zinc-800">{t("noAccount")}</p>
        <Link href={"/register"} className="text-maroon-700 font-medium">
          {t("createAccount")}
        </Link>
      </div>
    </main>
  );
}
