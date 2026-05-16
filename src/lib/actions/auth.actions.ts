"use server";

import {
  ForgotPasswordField,
  ForgotPasswordResponse,
  NewPasswordField,
  NewPasswordResponse,
} from "../types/auth";
import { OtpFormValues } from "../schemas/auth.schema";

type ActionError = {
  error: string;
};

type VerifyOtpResponse = {
  status: string;
  message: string;
};

const API_URL = process.env.API;

async function parseResponse<T>(response: Response): Promise<T | ActionError> {
  const payload = await response.json();

  if (!response.ok) {
    return {
      error: payload?.message || payload?.error || "Something went wrong",
    };
  }

  return payload;
}

// Forgot Password Action

export async function forgotPasswordAction(
  fields: ForgotPasswordField
): Promise<ForgotPasswordResponse | ActionError> {
  try {
    const response = await fetch(`${API_URL}/auth/forgotPassword`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(fields),
    });

    return parseResponse<ForgotPasswordResponse>(response);
  } catch {
    return {
      error: "Network error. Please check your connection and try again.",
    };
  }
}

// Verify OTP Action

export async function verifyOtpAction(
  values: OtpFormValues
): Promise<VerifyOtpResponse | ActionError> {
  try {
    const response = await fetch(`${API_URL}/auth/verifyResetCode`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        resetCode: values.otp,
      }),
    });

    return parseResponse<VerifyOtpResponse>(response);
  } catch {
    return {
      error: "Network error. Please check your connection and try again.",
    };
  }
}

// New Password Action

type NewPasswordActionParams = {
  email: string;
  fields: NewPasswordField;
};

export async function newPasswordAction({
  email,
  fields,
}: NewPasswordActionParams): Promise<NewPasswordResponse | ActionError> {
  try {
    const response = await fetch(`${API_URL}/auth/resetPassword`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        newPassword: fields.newPassword,
      }),
    });

    return parseResponse<NewPasswordResponse>(response);
  } catch {
    return {
      error: "Network error. Please check your connection and try again.",
    };
  }
}
