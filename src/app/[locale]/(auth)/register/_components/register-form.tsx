"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { PhoneInput } from "@/components/ui/phone-input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { PasswordInput } from "@/components/ui/password-input";
import { useRegister } from "../_hooks/use-register";
import { useTranslations } from "next-intl";
import { RegisterValues, RegistrationSchema } from "@/lib/schemas/auth.schema";
import { Loader2 } from "lucide-react";

export default function RegisterForm() {
  // Translation
  const t = useTranslations();

  // Mutation
  const { isPending, error, signup } = useRegister();

  // Form
  const form = useForm<RegisterValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: undefined,
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(RegistrationSchema(t)),
    mode: "onChange",
  });

  // Submit
  const onSubmit = (values: RegisterValues) => {
    signup(values);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full">
        <h3 className="mb-5 text-center font-edwardian text-4xl text-maroon-700 dark:text-softPink-300">
          {t("register.heading")}
        </h3>

        <div className="border-y border-zinc-300 py-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("register.fields.firstName")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("register.fields.lastName")}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("register.fields.email")}</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("register.fields.phone")}</FormLabel>
                    <FormControl>
                      <PhoneInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("register.fields.gender.index")}</FormLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("register.fields.gender.index")}
                          />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectItem value="male">
                          {t("register.fields.gender.male")}
                        </SelectItem>
                        <SelectItem value="female">
                          {t("register.fields.gender.female")}
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("register.fields.password")}</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
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
                    <FormLabel>
                      {t("register.fields.confirmPassword")}
                    </FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <p className="text-center text-red-500">{error.message}</p>
              )}

              <Button disabled={isPending} type="submit" className="w-full">
                {isPending ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  t("register.fields.createAccount")
                )}
              </Button>
            </form>
          </Form>
        </div>

        <p className="mt-3 text-center text-sm">
          {t("register.alreadyHaveAccount")}{" "}
          <Link href="/login" className="font-bold text-maroon-700">
            {t("register.login")}
          </Link>
        </p>
      </div>
    </div>
  );
}
