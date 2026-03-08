import z from "zod";
import {
  ForgotPasswordSchema,
  NewPasswordSchema,
} from "../schemas/auth.schema";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      username: string;
      email: string;
      phone: string;
      photo?: string;
      role: string;
      isVerified: boolean;
      createdAt: string;
      accesstoken: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string | null;
    phone: string;
    role: string;
    photo?: string;
    isVerified: boolean;
    createdAt: string;
    accesstoken: string;
  }
}

export type ResetPasswordPayload = {
  email: string;
  newPassword: string;
};

// ForgotPassword
export type ForgotPasswordResponse = {
  message: string;
  info: string;
};

export type ForgotPasswordField = z.infer<
  ReturnType<typeof ForgotPasswordSchema>
>;

// NewPassword
export type NewPasswordResponse = {
  message: string;
  token: string;
};

export type NewPasswordField = z.infer<ReturnType<typeof NewPasswordSchema>>;
