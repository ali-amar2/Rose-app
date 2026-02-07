"use client";
import { useWishlist } from "@/hooks/use-wishlist";
import { useToggleWishlist } from "@/hooks/use-toggle-wishlist";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { HeartMinus, HeartPlus } from "lucide-react";
import { useState } from "react";

type Props = {
  id: string;
};

export default function AddToWishlist({ id }: Props) {
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showRemove, setShowRemove] = useState<boolean>(false);
  const { data: session } = useSession();
  const isLoggedIn = !!session;
  const router = useRouter();

  const { data: wishlist } = useWishlist(isLoggedIn);

  const { mutate, isPending } = useToggleWishlist();

  const isInWishlist = wishlist?.some((item) => item.productId === id);

  const handleToggle = () => {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    mutate(id);
  };

  return (
    <div>
      {isInWishlist ? (
        <button
          onClick={handleToggle}
          onMouseEnter={() => setShowRemove(true)}
          onMouseLeave={() => setShowRemove(false)}
          disabled={isPending}
          className="bg-black text-white rounded-full  h-8 flex items-center justify-center absolute top-2 left-2 px-2"
        >
          <HeartMinus size={18} strokeWidth={2.5} />
          {showRemove && (
            <span className="px-1 text-xs font-medium">
              Remove from wishlist
            </span>
          )}
        </button>
      ) : (
        <button
          onClick={handleToggle}
          onMouseEnter={() => setShowAdd(true)}
          onMouseLeave={() => setShowAdd(false)}
          disabled={isPending}
          className="bg-white text-maroon-600 rounded-full  h-8 flex items-center justify-center absolute top-2 left-2 px-2"
        >
          <HeartPlus size={18} strokeWidth={2.5} />
          {showAdd && (
            <span className="px-1 text-xs font-medium">add to wishlist</span>
          )}
        </button>
      )}
    </div>
  );
}
