"use server";

import { RegisterValues } from "@/lib/schemas/auth.schema";

export async function registerAction(data: RegisterValues) {
  try {
    const response = await fetch(`${process.env.API}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const payload = await response.json();

    if (!response.ok) {
      return {
        error: payload?.error || "Registration failed",
      };
    }

    return {
      message: payload.message,
      user: payload.user,
    };
  } catch {
    return {
      error: "Network error. Please try again later",
    };
  }
}
