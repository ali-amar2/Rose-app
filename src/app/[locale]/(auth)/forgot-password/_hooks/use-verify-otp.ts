import { useMutation } from "@tanstack/react-query";
import { verifyOtpAction } from "@/lib/actions/auth.actions";
import { OtpFormValues } from "@/lib/schemas/auth.schema";

export default function useVerifyOtp(onSuccessCallback?: () => void) {
  const mutation = useMutation({
    mutationFn: async (values: OtpFormValues) => {
      const payload = await verifyOtpAction(values);

      if ("error" in payload) {
        throw new Error(payload.error);
      }

      return payload;
    },

    onSuccess: () => {
      onSuccessCallback?.();
    },
  });

  return {
    verifyOtp: mutation.mutate,
    isPending: mutation.isPending,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
}
