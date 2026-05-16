import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { registerAction } from "../_actions/register.action";
import { RegisterValues } from "@/lib/schemas/auth.schema";

export function useRegister() {
  const router = useRouter();

  const { isPending, error, mutate } = useMutation({
    mutationFn: async (values: RegisterValues) => {
      const res = await registerAction(values);

      if ("error" in res) {
        throw new Error(res.error);
      }

      return res;
    },

    onSuccess: () => {
      router.push("/login");
    },
  });

  return {
    isPending,
    error,
    signup: mutate,
  };
}
