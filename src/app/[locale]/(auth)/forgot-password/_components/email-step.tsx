"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { ForgotPasswordSchema } from "@/lib/schemas/auth.schema";
import useForgotPassword from "../_hooks/use-forgot-password";
import { ForgotPasswordField, ForgotPasswordSteps } from "@/lib/types/auth";
import { Dispatch, SetStateAction } from "react";
import { FORGOT_PASSWORD_STEPS } from "@/lib/constants/auth.constant";

type Props = {
  setStep: Dispatch<SetStateAction<ForgotPasswordSteps>>;
  setEmail: Dispatch<SetStateAction<string>>;
};

export default function EmailStep({ setStep, setEmail }: Props) {
  const t = useTranslations();

  const { isPending, error, forgotPassword } = useForgotPassword((email) => {
    setEmail(email);
    setStep(FORGOT_PASSWORD_STEPS.OTP);
  });

  const form = useForm<ForgotPasswordField>({
    defaultValues: {
      email: "",
    },

    resolver: zodResolver(ForgotPasswordSchema(t)),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ForgotPasswordField> = (values) => {
    forgotPassword(values);
  };

  return (
    <div className="w-full text-zinc-800 dark:text-zinc-50">
      <h2 className="text-2xl font-semibold">{t("forgot-password-heading")}</h2>

      <p className="mb-4 text-base font-medium">{t("forget-password-text")}</p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 border-y border-y-zinc-200 pt-6 pb-9 dark:border-y-zinc-600"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email-label")}</FormLabel>

                <FormControl>
                  <Input placeholder={t("email-placeholder")} {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <p className="text-sm font-medium text-red-600">{error.message}</p>
          )}

          <Button
            isLoading={isPending}
            disabled={!form.formState.isValid || isPending}
            type="submit"
            className="w-full"
          >
            {t("continue")}
          </Button>
        </form>

        <p className="mt-5 text-center font-medium">
          {t.rich("dont-have-an-account", {
            a: (chunk) => (
              <Link
                href="/register"
                className="font-bold text-maroon-700 dark:text-softPink-200"
              >
                {chunk}
              </Link>
            ),
          })}
        </p>
      </Form>
    </div>
  );
}
