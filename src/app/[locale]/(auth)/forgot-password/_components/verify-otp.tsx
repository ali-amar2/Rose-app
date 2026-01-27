"use client";

// NOTE: you will need to import this component in some where

import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import useVerifyOtp from "../_hooks/use-verify-otp";
import { useEffect, useState } from "react";

// resend timer localStorage key
const RESEND_TIMER_KEY = "resend_otp_expire_at";

// intial resend duration in seconds
const RESEND_DURATION = 60; // seconds

export default function VerifyOtp() {
  // translations
  const t = useTranslations("verify");

  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [otpValue, setOtpValue] = useState<string>("");

  // mutation hook
  const { verifyOtp, isPending, error } = useVerifyOtp();

  // TODO: resend code action
  const handleResendCode = () => {
    // call resend otp API here

    const expireAt = Date.now() + RESEND_DURATION * 1000;
    localStorage.setItem(RESEND_TIMER_KEY, expireAt.toString());
    setSecondsLeft(RESEND_DURATION);
  };

  // handle verify otp
  const handleVerifyOtp = () => {
    verifyOtp();
  };

  // Initialize timer on mount from localStorage
  useEffect(() => {
    const expireAt = localStorage.getItem(RESEND_TIMER_KEY);
    if (!expireAt) return;

    const diff = Math.ceil((Number(expireAt) - Date.now()) / 1000);
    if (diff > 0) {
      setSecondsLeft(diff);
    } else {
      localStorage.removeItem(RESEND_TIMER_KEY);
    }
  }, []);

  // Handle countdown timer
  useEffect(() => {
    if (secondsLeft === null) return;

    if (secondsLeft <= 0) {
      localStorage.removeItem(RESEND_TIMER_KEY);
      setSecondsLeft(null);
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === null || prev <= 1) {
          localStorage.removeItem(RESEND_TIMER_KEY);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  return (
    <>
      <div className="w-[25.3rem] mx-auto">
        <main>
          <div className="border-b border-zinc-200 mb-10 dark:border-zinc-600">
            <h2 className="capitalize text-2xl font-semibold text-zinc-800 mb-1 dark:text-zinc-50">
              {t("title")}
            </h2>

            {/* TODO: this link depends on forget email api that will be implemented */}
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
        <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
          {Array.from({ length: 6 }, (_, i) => i).map((i) => (
            <InputOTPSlot key={i} index={i} className="mx-auto " />
          ))}
        </InputOTP>

        {/* send new code again */}
        <div className="text-right py-2 px-4 mt-6 me-8">
          {secondsLeft ? (
            <span className="text-sm font-medium text-zinc-500">
              {t("resend-after")} {secondsLeft}s
            </span>
          ) : (
            <Button
              onClick={handleResendCode}
              variant="ghost"
              className="text-base font-medium text-zinc-800 capitalize dark:text-zinc-50"
            >
              {t("send-code")}
            </Button>
          )}
        </div>

        {/* error message */}
        <p className="text-red-500 font-semibold capitalize">
          {error?.message}
        </p>

        {/* Verify otp button  */}
        <div className="py-3 px-4 border-b border-zinc-200 dark:border-zinc-600 ">
          <Button
            onClick={handleVerifyOtp}
            disabled={otpValue.length !== 6 || isPending}
            className="w-full my-9 bg-maroon-600 text-white font-medium text-base capitalize dark:bg-softPink-300 dark:text-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
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
