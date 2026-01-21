import { verifyOtpAction } from "@/lib/actions/auth.actions";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

export default function useVerifyOtp() {
  //   translations
  const t = useTranslations("verify");

  // mutation
  const { isPending, error, mutate } = useMutation({
    mutationFn: async () => {
      const payload = await verifyOtpAction();
      return payload;
    },

    // on success
    onSuccess: () => {
      // context/theme provider
      const isDark = false;

      toast.success(t("success-toast"), {
        duration: 4000,
        style: isDark
          ? {
              backgroundColor: "#5EE9B5",
              color: "#27272A",
              padding: "1rem",
              gap: "0.625rem",
              borderRadius: "0.625rem",
              border: "1px solid #4B5563",
              fontWeight: "600",
              fontSize: "0.875rem",
            }
          : {
              background: "#ECFDF5",
              color: "#27272A",
              padding: "1rem",
              gap: "0.625rem",
              borderRadius: "0.625rem",
              border: "1px solid #007A55",
              fontWeight: "600",
              fontSize: "0.875rem",
            },
      });
    },

    // on error
    onError: () => {
      // context/theme provider
      const isDark = false;

      toast.error(t("error-toast"), {
        duration: 4000,
        style: isDark
          ? {
              backgroundColor: "#5EE9B5",
              color: "#27272A",
              padding: "1rem",
              gap: "0.625rem",
              borderRadius: "0.625rem",
              border: "1px solid #4B5563",
              fontWeight: "600",
              fontSize: "0.875rem",
            }
          : {
              background: "#ECFDF5",
              color: "#27272A",
              padding: "1rem",
              gap: "0.625rem",
              borderRadius: "0.625rem",
              border: "1px solid #007A55",
              fontWeight: "600",
              fontSize: "0.875rem",
            },
      });
    },
  });

  return { isPending, error, verifyOtp: mutate };
}
