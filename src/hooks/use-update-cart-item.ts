"use client";

import { updateCartItemQuantityAction } from "@/lib/actions/cart.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateCartItemQuantityPayload = {
  productId: string;
  quantity: number;
};

export function useUpdateCartItemQuantity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, quantity }: UpdateCartItemQuantityPayload) =>
      updateCartItemQuantityAction(productId, quantity),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
}
