import { useMutation } from "@tanstack/react-query";
import { forgotPasswordAction } from "@/lib/actions/auth.actions";
import { ForgotPasswordField } from "@/lib/types/auth";
import { useToast } from "@/hooks/use-toast";

export default function useForgotPassword(
  onSuccessCallback?: (email: string) => void
) {
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (values: ForgotPasswordField) => {
      const payload = await forgotPasswordAction(values);

      if ("error" in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },

    onSuccess: (_, variables) => {
      onSuccessCallback?.(variables.email);

      toast({
        title: "OTP Sent",
        description: "Check your email",
      });
    },
  });

  return {
    forgotPassword: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
