import { getWishlist } from "@/lib/services/wishlist.service";
import { useQuery } from "@tanstack/react-query";

export const useWishlist = (enabled: boolean) => {
  return useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    enabled,
  });
};
