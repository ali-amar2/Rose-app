"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { loginSchema, loginValues } from "@/lib/schemas/auth.schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import useLogin from "../_hooks/use-login";
import { Loader } from "lucide-react";
import { useTranslations } from "next-intl";
import { getFriendlyErrorMessage } from "@/lib/utils/auth";
import { Link } from "@/i18n/navigation";

export default function LoginForm() {
  // Translation
  const t = useTranslations("login");

  // State
  const form = useForm<loginValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    resolver: zodResolver(loginSchema(t)),
    mode: "onChange",
  });

  const { isPending, mutate: login, isError, error } = useLogin();
  const router = useRouter();

  // Variables
  const errorMessage = getFriendlyErrorMessage(error?.message || "", t);

  const onsubmit: SubmitHandler<loginValues> = async (values) => {
    login(values, {
      onSuccess: () => {
        router.replace("/");
      },
    });
  };

  return (
    <>
      <Form {...form}>
        <form
          className="flex flex-col w-[25rem]"
          onSubmit={form.handleSubmit(onsubmit)}
        >
          {/* Form Fields */}
          <div className="flex flex-col gap-4">
            {/* Email Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder={t("email-placeholder")}
                      error={!!form.formState.errors.email}
                    />
                  </FormControl>
                  <FormMessage className="text-[0.9rem]" />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("password")}</FormLabel>
                  <FormControl>
                    <PasswordInput
                      {...field}
                      placeholder={t("password-placeholder")}
                      error={!!form.formState.errors.password}
                    />
                  </FormControl>
                  <FormMessage className="text-[0.9rem]" />
                </FormItem>
              )}
            />

            {/* Navigation */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-maroon-700 font-medium mt-2"
              >
                {t("forgot-password")}
              </Link>
            </div>
          </div>

          {/* Submission Error */}
          {isError && (
            <p className="text-center text-red-600 mt-3">{errorMessage}</p>
          )}

          {/* Remember Me */}
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <Label className="flex items-center gap-2 cursor-pointer my-5 mb-8">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="border-maroon-700 data-[state=checked]:bg-maroon-600"
                />
                <span className="text-zinc-700">{t("rememberMe")}</span>
              </Label>
            )}
          />

          {/* Submit Button */}
          <Button disabled={isPending} type="submit">
            {isPending ? (
              <Loader className="animate-spin mr-2" size={16} />
            ) : (
              t("loginBtn")
            )}
          </Button>
          {/* Submission Error */}
          {isError && (
            <p className="text-center text-red-600 mt-3">{errorMessage}</p>
          )}

          {/* Remember Me */}
          <Label className="flex items-center gap-2 cursor-pointer my-5 mb-8">
            <Checkbox className="border-maroon-700 data-[state=checked]:bg-maroon-600" />
            <span className="text-zinc-700">{t("remember-me")}</span>
          </Label>

          {/* Submit Button */}
          <Button disabled={isPending} type="submit">
            {isPending ? (
              <Loader className="animate-spin mr-2" size={16} />
            ) : (
              t("login-btn")
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
