// auth.schema.ts
import z from "zod";
import { Translations } from "../types/global";

export const loginSchema = (t: Translations) =>
  z.object({
    email: z
      .string()
      .email(t("schema.invalidEmail"))
      .nonempty(t("schema.emailRequired")),
    password: z.string().nonempty(t("schema.passwordRequired")),
  });

export type loginValues = z.infer<ReturnType<typeof loginSchema>>;

// forgot-password schema
export const ForgotPasswordSchema = (t: Translations) =>
  z.object({
    email: z
      .email({
        error: (iss) =>
          iss.code === "invalid_type"
            ? `${t("non-email-error")}`
            : `${t("email-not-valid")}`,
      })
      .nonempty(`${t("required-email")}`),
  });

// new-password schema
export const NewPasswordSchema = (t: Translations) =>
  z
    .object({
      newPassword: z
        .string()
        .nonempty(t("password-is-required"))
        .min(8, t("password-at-least-8-characters"))
        .regex(/[A-Z]/, t("password-contain-uppercase-letter"))
        .regex(/[a-z]/, t("password-contain-lowercase-letter"))
        .regex(/[0-9]/, t("password-contain--one-number"))
        .regex(
          /[@$!%*?&]/,
          "Password must contain at least one special character"
        ),
      rePassword: z
        .string()
        .nonempty(t("password-is-required"))
        .min(8, t("password-at-least-8-characters"))
        .optional(),
    })
    .refine((values) => values.newPassword === values.rePassword, {
      message: t("passwords-do-not-match"),
      path: ["rePassword"],
    });

// OTP Schema
export const otpSchema = z.object({
  otp: z.string(),
});

export type OtpFormValues = z.infer<typeof otpSchema>;
