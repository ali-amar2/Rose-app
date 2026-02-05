"use server";

import {
  ForgetPasswordField,
  ForgotPasswordResponse,
  NewPasswordField,
  NewPasswordResponse,
} from "../types/auth";

// Forgot Password Action

export async function forgotPasswordAction(fields: ForgetPasswordField) {
  const response = await fetch(`${process.env.API}//auth/forgotPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fields),
  });

  const payload: ForgotPasswordResponse = await response.json();
  return payload;
}

// New Password Action

type NewPasswordActionParams = {
  email: string;
  fields: NewPasswordField;
};

export async function newPasswordAction({
  email,
  fields,
}: NewPasswordActionParams) {
  const response = await fetch(`${process.env.API}/auth/resetPassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      newPassword: fields.newPassword,
    }),
  });

  const payload: NewPasswordResponse = await response.json();
  console.log(payload);

  return payload;
}
