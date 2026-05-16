import { loginValues } from "@/lib/schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export default function useLogin() {
  return useMutation({
    mutationFn: async (values: loginValues) => {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (!res || res.error) {
        throw new Error(res?.error || "Login failed");
      }

      return res;
    },
  });
}
