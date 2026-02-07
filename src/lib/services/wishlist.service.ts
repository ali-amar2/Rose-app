export const getWishlist = async (): Promise<WishlistItem[]> => {
  const res = await fetch(`${process.env.API}/wishlist/`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch wishlist");
  }

  return res.json();
};

export const toggleWishlist = async (
  productId: string
): Promise<{ success: boolean }> => {
  const res = await fetch(`${process.env.API}/wishlist/add`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) {
    throw new Error("Failed to toggle wishlist");
  }

  return res.json();
};
