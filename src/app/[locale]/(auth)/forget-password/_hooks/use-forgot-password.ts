import { useToast } from "@/hooks/use-toast";
import { forgotPasswordAction } from "@/lib/actions/auth.action";
import { ForgetPasswordField } from "@/lib/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useForgotPassword() {
  // Queries
  const queryClient = useQueryClient();

  //Toast

  const { toast } = useToast();

  //Mutations
  const { isPending, error, mutate } = useMutation({
    mutationKey: ["forgot-password"],
    mutationFn: async (fields: ForgetPasswordField) => {
      const payload = await forgotPasswordAction(fields);

      // Error
      if ("error" in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },
    onSuccess: (_, variables) => {
      // TODO: Store email in useState after workflow task is done (out of current scope).
      queryClient.setQueryData(["forgot-password-email"], variables.email);
      toast({
        title: "OTP Sended",
        description: "Check Your mail Please",
      });
    },
  });

  return { isPending, error, forgotPassword: mutate };
}
