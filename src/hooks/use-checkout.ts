import { AddCheckoutCash } from "@/lib/actions/checkout.actions";
import { useMutation } from "@tanstack/react-query";

export function useCheckout() {
  const { mutate: checkout, isPending } = useMutation({
    mutationFn: (payload: CheckoutPayload) => AddCheckoutCash(payload),
  });

  return { checkout, isPending };
}
