import { UserResponse } from "@/lib/types/account";

export async function getLoggedUserService(): Promise<UserResponse> {
  const res = await fetch("/api/account", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch Cart");

  return res.json();
}
