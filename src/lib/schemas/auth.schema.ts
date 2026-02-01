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
