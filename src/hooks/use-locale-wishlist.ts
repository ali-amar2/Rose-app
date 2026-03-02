import { useState, useEffect } from "react";

export function useLocalWishlist(productId: string) {
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(sessionStorage.getItem("wishlist") || "[]");
    setIsInWishlist(wishlist.includes(productId));
  }, [productId]);

  const toggleWishlistGuest = () => {
    const wishlist = JSON.parse(sessionStorage.getItem("wishlist") || "[]");

    if (wishlist.includes(productId)) {
      // Remove
      const newWishlist = wishlist.filter((id: string) => id !== productId);
      sessionStorage.setItem("wishlist", JSON.stringify(newWishlist));
      setIsInWishlist(false);
    } else {
      // Add
      wishlist.push(productId);
      sessionStorage.setItem("wishlist", JSON.stringify(wishlist));
      setIsInWishlist(true);
    }
  };

  return { isInWishlist, toggleWishlistGuest };
}
