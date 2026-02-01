import { useTranslations } from "next-intl";

// Generic utility function
export function getFriendlyErrorMessage(
  error: string,
  t: ReturnType<typeof useTranslations>
) {
  if (!error) return t("genericError");
  if (error.includes("fails to match the required pattern")) {
    return t("passwordPatternError");
  }
  return error;
}
