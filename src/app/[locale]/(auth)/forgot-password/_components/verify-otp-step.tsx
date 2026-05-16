"use client";

import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import useVerifyOtp from "../_hooks/use-verify-otp";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema, type OtpFormValues } from "@/lib/schemas/auth.schema";
import { ForgotPasswordSteps } from "@/lib/types/auth";
import { FORGOT_PASSWORD_STEPS } from "@/lib/constants/auth.constant";

const RESEND_TIMER_KEY = "resend_otp_expire_at";
const RESEND_DURATION = 60;

type Props = {
  email: string;
  setStep: Dispatch<SetStateAction<ForgotPasswordSteps>>;
};

export default function VerifyOtp({ email, setStep }: Props) {
  const t = useTranslations("verify");

  const { verifyOtp, isPending, error } = useVerifyOtp(() => {
    setStep(FORGOT_PASSWORD_STEPS.NEW_PASSWORD);
  });

  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  const translatedOtpSchema = otpSchema.refine(
    (data) => data.otp.length === 6,
    {
      message: t("otp-validation"),
      path: ["otp"],
    }
  );

  const form = useForm<OtpFormValues>({
    resolver: zodResolver(translatedOtpSchema),

    defaultValues: {
      otp: "",
    },
  });

  const otpValue = form.watch("otp");

  const handleResendCode = () => {
    const expireAt = Date.now() + RESEND_DURATION * 1000;

    localStorage.setItem(RESEND_TIMER_KEY, expireAt.toString());

    setSecondsLeft(RESEND_DURATION);

    // TODO: resend otp action
  };

  const onSubmit = (data: OtpFormValues) => {
    verifyOtp(data);
  };

  useEffect(() => {
    const expireAt = localStorage.getItem(RESEND_TIMER_KEY);

    if (!expireAt) return;

    const diff = Math.ceil((+expireAt - Date.now()) / 1000);

    diff > 0 ? setSecondsLeft(diff) : localStorage.removeItem(RESEND_TIMER_KEY);
  }, []);

  useEffect(() => {
    if (!secondsLeft) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (!prev || prev <= 1) {
          localStorage.removeItem(RESEND_TIMER_KEY);

          return null;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  useEffect(() => {
    if (otpValue.length === 6) {
      form.handleSubmit(onSubmit)();
    }
  }, [otpValue]);

  return (
    <div className="mx-auto w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-10 border-b border-zinc-200 pb-4 dark:border-zinc-600">
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-50">
              {t("title")}
            </h2>

            <p className="text-zinc-800 dark:text-zinc-50">
              {t("send-to")} {email}
              <Link href="#">
                <span className="ms-1 font-medium text-blue-700 underline">
                  {t("edit-email")}
                </span>
              </Link>
            </p>
          </div>

          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}
                  >
                    {Array.from({ length: 6 }).map((_, i) => (
                      <InputOTPSlot key={i} index={i} className="mx-auto" />
                    ))}
                  </InputOTP>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="me-8 mt-6 text-right">
            {secondsLeft ? (
              <span className="text-sm font-medium text-zinc-500">
                {t("resend-after")} {secondsLeft}s
              </span>
            ) : (
              <Button
                type="button"
                onClick={handleResendCode}
                variant="ghost"
                className="text-base font-medium text-zinc-800 dark:text-zinc-50"
              >
                {t("send-code")}
              </Button>
            )}
          </div>

          {error && (
            <p className="mt-4 font-medium text-red-500">{error.message}</p>
          )}

          <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-600">
            <Button
              type="submit"
              disabled={isPending || otpValue.length !== 6}
              isLoading={isPending}
              className="my-9 w-full"
            >
              {t("verify-otp")}
            </Button>
          </div>

          <p className="mt-5 text-center text-sm font-medium text-zinc-800 dark:text-zinc-50">
            {t("help")}

            <span className="ms-1 font-bold text-maroon-700 dark:text-softPink-300">
              {t("contact")}
            </span>
          </p>
        </form>
      </Form>
    </div>
  );
}
