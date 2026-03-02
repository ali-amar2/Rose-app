import {
  addWishlist,
  checkWishlist,
  removeWishlist,
} from "@/lib/actions/wishlist.action";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function useToggleWishlist(productId: string) {
  const { data, isLoading } = useQuery({
    queryKey: ["wishlist", productId],
    queryFn: () => checkWishlist(productId),
  });
  
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      if (data) {
        return removeWishlist(productId);
      } else {
        return addWishlist({ productId });
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist", productId] });
    },
  });

  return { mutation, data, isLoading };
}
