"use client";
import { ReactNode } from "react";
import AccountForm from "@/app/[locale]/profile/_components/account-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function ProfileSetting() {
  // navigation
  const router = useRouter();

  //   translation
  const t = useTranslations("login");

  const extraActions: ReactNode = (
    <Button
      variant="default"
      onClick={() => router.push("/profile/change-password")}
    >
      {t("change-password")}
    </Button>
  );

  return (
    <>
      <AccountForm extraActions={extraActions} />
    </>
  );
}
