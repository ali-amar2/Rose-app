// "use client";

// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import {
//   addWishlistAction,
//   removeWishlistAction,
// } from "@/lib/actions/wishlist.action";
// import { getWishlist } from "@/lib/services/whishlist.service";

// export default function useWishlist() {
//   const queryClient = useQueryClient();

//   // ✅ products array only
//   const { data: wishlist = [] } = useQuery({
//     queryKey: ["wishlist"],
//     queryFn: getWishlist,
//   });

//   // 🔥 FIX: wishlist is array of products
//   const isInWishlist = (id: string) =>
//     wishlist.some((item: any) => item._id === id);

//   const mutation = useMutation({
//     mutationFn: async (productId: string) => {
//       return isInWishlist(productId)
//         ? removeWishlistAction(productId)
//         : addWishlistAction(productId);
//     },

//     onMutate: async (productId) => {
//       await queryClient.cancelQueries({ queryKey: ["wishlist"] });

//       const prev = queryClient.getQueryData<any[]>(["wishlist"]) || [];

//       const exists = prev.some((item) => item._id === productId);

//       queryClient.setQueryData(
//         ["wishlist"],
//         exists
//           ? prev.filter((item) => item._id !== productId)
//           : [...prev, { _id: productId }]
//       );

//       return { prev };
//     },

//     onError: (_err, _id, ctx) => {
//       queryClient.setQueryData(["wishlist"], ctx?.prev);
//     },

//     onSettled: () => {
//       queryClient.invalidateQueries({ queryKey: ["wishlist"] });
//     },
//   });

//   return {
//     wishlist,
//     isInWishlist,
//     toggleWishlist: mutation.mutate,
//     isPending: mutation.isPending,
//   };
// }
