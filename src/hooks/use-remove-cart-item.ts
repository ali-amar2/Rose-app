"use client";

import { removeCartItemAction } from "@/lib/actions/cart.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId: string) => removeCartItemAction(productId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
}
