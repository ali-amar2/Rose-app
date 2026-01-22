import { useMutation } from "@tanstack/react-query";
import { registerService } from "../_services/register.service";

export function useRegister() {
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (values: any) => {
      const response = await registerService({ values });

      if (response?.error) {
        throw new Error(response?.error || "Sign up failed");
      }

      // redirect to callbackUrl
      const callbackUrl =
        new URLSearchParams(window.location.search).get("callbackUrl") || "/";
      window.location.href = callbackUrl;

      return response;
    },
  });

  return { isPending, error, signup: mutate };
}
