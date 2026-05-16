// "use client";

// import { HeartMinus, HeartPlus } from "lucide-react";
// import { useState } from "react";
// import { cn } from "@/lib/utils/tailwind-merge";
// import useWishlist from "@/hooks/use-wishlist";
// import { useTranslations } from "next-intl";
// import { Button } from "../ui/button";

// type Props = {
//   productId: string;
// };

// export default function AddToWishlist({ productId }: Props) {
//   const t = useTranslations("");

//   const [showAdd, setShowAdd] = useState(false);
//   const [showRemove, setShowRemove] = useState(false);

//   const { isInWishlist, toggleWishlist, isPending } = useWishlist();

//   const active = isInWishlist(productId);

//   const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();

//     if (isPending) return;

//     toggleWishlist(productId);
//   };

//   return (
//     <div>
//       {active ? (
//         <Button
//           variant={"inactive"}
//           type="button"
//           onClick={handleToggle}
//           onMouseEnter={() => setShowAdd(true)}
//           onMouseLeave={() => setShowAdd(false)}
//           disabled={isPending}
//           className={cn(
//             "bg-white text-maroon-600 rounded-full h-8 flex items-center justify-center absolute top-2 left-2 px-2 transition-all duration-200",
//             isPending && "opacity-50 cursor-not-allowed"
//           )}
//         >
//           <HeartMinus size={18} strokeWidth={2.5} />

//           {showRemove && (
//             <span className="px-1 text-xs font-medium">
//               {t("remove-from-wishlist")}
//             </span>
//           )}
//         </Button>
//       ) : (
//         <Button
//           onClick={handleToggle}
//           onMouseEnter={() => setShowAdd(true)}
//           onMouseLeave={() => setShowAdd(false)}
//           disabled={isPending}
//           className={cn(
//             "bg-white text-maroon-600 rounded-full h-8 flex items-center justify-center absolute top-2 left-2 px-2 transition-all duration-200",
//             isPending && "opacity-50 cursor-not-allowed"
//           )}
//         >
//           <HeartPlus size={18} strokeWidth={2.5} />

//           {showAdd && (
//             <span
//               className={cn(
//                 "px-1 text-xs font-medium transition-all duration-200"
//               )}
//             >
//               {t("add-to-wishlist")}
//             </span>
//           )}
//         </Button>
//       )}
//     </div>
//   );
// }
