"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { NewPasswordField } from "@/lib/types/auth";
import { useTranslations } from "next-intl";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/lib/schemas/auth.schema";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import useNewPassword from "../_hooks/use-new-password";

type Props = {
  email: string;
};

export default function NewPasswordStep({ email }: Props) {
  const t = useTranslations();

  const { isPending, error, resetPassword } = useNewPassword();

  const form = useForm<NewPasswordField>({
    defaultValues: {
      newPassword: "",
      rePassword: "",
    },

    resolver: zodResolver(NewPasswordSchema(t)),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<NewPasswordField> = (values) => {
    resetPassword({
      email,
      fields: values,
    });
  };

  return (
    <div className="w-full text-zinc-800 dark:text-zinc-50">
      <h2 className="text-2xl font-semibold">
        {t("create-new-password-label")}
      </h2>

      <p className="mb-4 text-base font-medium">
        {t("create-new-password-text")}
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-7 border-y border-y-zinc-200 pt-6 pb-9 dark:border-y-zinc-600"
        >
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("password-label")}</FormLabel>

                <FormControl>
                  <PasswordInput placeholder="************" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("confirm-password-label")}</FormLabel>

                <FormControl>
                  <PasswordInput placeholder="************" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <p className="mt-2 text-sm font-medium text-red-600">
              {error.message}
            </p>
          )}

          <Button
            isLoading={isPending}
            disabled={!form.formState.isValid || isPending}
            type="submit"
            className="w-full"
          >
            {t("reset-password-btn")}
          </Button>
        </form>

        <p className="mt-5 text-center font-medium">
          {t.rich("need-help", {
            a: (chunk) => (
              <Link
                href="/contact"
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
