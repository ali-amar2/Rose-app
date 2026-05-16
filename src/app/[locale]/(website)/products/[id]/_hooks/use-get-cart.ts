import { useQuery } from "@tanstack/react-query";
import { getCartService } from "../_services/cart.service";
import { useSession } from "next-auth/react";

export function useGetCart() {
  const { data: session, status } = useSession();

  const userId = status === "authenticated" ? session?.user?._id : "guest";

  const { data } = useQuery({
    queryKey: ["cart", userId],
    queryFn: getCartService,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  return {
    cart: data,
  };
}
