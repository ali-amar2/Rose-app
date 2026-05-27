"use client";

import type {
  AddToCartPayload,
  CartErrorResponse,
  CartResponse,
} from "@/lib/types/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";
import { addToCartAction } from "@/lib/actions/cart.actions";

type UseAddToCartOptions = {
  onSuccess?: (data: CartResponse | CartErrorResponse) => void;
};

export function useAddToCart(options?: UseAddToCartOptions) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: session, status } = useSession();
  const userId = status === "authenticated" ? session?.user?._id : "guest";

  const mutation = useMutation({
    mutationFn: (payload: AddToCartPayload) => addToCartAction(payload),

    onSuccess: async (data) => {
      queryClient.setQueryData(["cart", userId], data);
      await queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast({
        title: "Added to cart",
        description: "Product added successfully.",
        variant: "success",
      });

      options?.onSuccess?.(data);
    },

    onError: (error: Error) => {
      toast({
        title: "Failed to add product",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    },
  });

  return {
    addToCart: mutation.mutate,
    addToCartAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
  };
}
