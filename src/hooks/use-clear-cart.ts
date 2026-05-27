"use client";

import { clearCartAction } from "@/lib/actions/cart.actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useClearCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => clearCartAction(),

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
}
