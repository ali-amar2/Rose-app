import { useMutation } from "@tanstack/react-query";
import { newPasswordAction } from "@/lib/actions/auth.actions";
import { NewPasswordField } from "@/lib/types/auth";
import { useRouter } from "@/i18n/navigation";
import { useToast } from "@/hooks/use-toast";

type ResetPasswordPayload = {
  email: string;
  fields: NewPasswordField;
};

export default function useNewPassword() {
  const router = useRouter();

  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async ({ email, fields }: ResetPasswordPayload) => {
      const payload = await newPasswordAction({
        email,
        fields,
      });

      if ("error" in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },

    onSuccess: () => {
      toast({
        title: "Password reset successful",
        description: "You can now login with your new password",
      });

      router.replace("/login");
    },
  });

  return {
    resetPassword: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
