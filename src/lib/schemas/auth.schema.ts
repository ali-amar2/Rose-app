// auth.schema.ts
import z from "zod";
import { Translations } from "../types/global";

export const loginSchema = (t: Translations) =>
  z.object({
    email: z
      .string()
      .email(t("schema.invalid-email"))
      .nonempty(t("schema.email-required")),
    password: z.string().nonempty(t("schema.password-required")),
  });

export type loginValues = z.infer<ReturnType<typeof loginSchema>>;
