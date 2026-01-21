"use client";

import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import useVerifyOtp from "../_hooks/use-verify-otp";

export default function VerifyOtp() {
  // translations
  const t = useTranslations("verify");

  // mutation hook
  const { verifyOtp, isPending } = useVerifyOtp();

  // handle verify otp
  const handleVerifyOtp = () => {
    verifyOtp();
  };

  return (
    <>
      <div className="w-[25.3rem] mx-auto">
        <main>
          <div className="border-b border-zinc-200 mb-10 dark:border-zinc-600">
            <h2 className="capitalize text-2xl font-semibold text-zinc-800 mb-1 dark:text-zinc-50">
              {t("title")}
            </h2>
            <p className="text-base font-normal text-zinc-800 dark:text-zinc-50 mb-4">
              {t("send-to")} user@example.com
              <Link href={"#"}>
                <span className="text-blue-700 font-medium capitalize underline ms-1 ">
                  {t("edit-email")}
                </span>
              </Link>
            </p>
          </div>
        </main>

        {/* otp input */}
        <InputOTP maxLength={6}>
          {Array.from({ length: 6 }, (_, i) => i).map((i) => (
            <InputOTPSlot key={i} index={i} className="mx-auto " />
          ))}
        </InputOTP>

        {/* send new code again */}
        <div className="text-right py-2 px-4 mt-6 me-8">
          <Link
            href={"#"}
            className="text-base font-medium text-zinc-800 capitalize dark:text-zinc-50"
          >
            {t("send-code")}
          </Link>
        </div>

        {/* Verify otp button  */}
        <div className="py-3 px-4 border-b border-zinc-200 dark:border-zinc-600 ">
          <Button
            onClick={handleVerifyOtp}
            className="w-full my-9 bg-maroon-600 text-white font-medium text-base capitalize dark:bg-softPink-300 dark:text-zinc-800"
          >
            {t("verify-otp")}
          </Button>
        </div>

        <p className="text-sm font-medium text-center mt-5 text-zinc-800 dark:text-zinc-50">
          {t("help")}
          <span className="font-bold text-maroon-700 dark:text-softPink-300">
            {t("contact")}
          </span>
        </p>
      </div>
    </>
  );
}
