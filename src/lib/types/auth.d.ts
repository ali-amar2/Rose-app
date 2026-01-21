import z from "zod";
import { ForgotPasswordSchema, NewPasswordSchema } from "../schems/auth.schema";

// ForgotPassword
export type ForgotPasswordResponse = {
  message: string;
  info: string;
};

export type ForgetPasswordField = z.infer<
  ReturnType<typeof ForgotPasswordSchema>
>;

// NewPassword
export type NewPasswordResponse = {
  message: string;
  token: string;
};

export type NewPasswordField = z.infer<ReturnType<typeof NewPasswordSchema>>;
