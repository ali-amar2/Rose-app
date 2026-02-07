import { toggleWishlist } from "@/lib/services/wishlist.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useToggleWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    },
  });
};
