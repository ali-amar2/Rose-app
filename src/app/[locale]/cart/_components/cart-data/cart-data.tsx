"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CartGuestData from "../cart-guest-data/cart-guest-data";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Plus, Minus, Trash2, BrushCleaning, MoveLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import { deleteCart } from "@/lib/actions/delete-cart.actions";
import { updateCartQuantity } from "@/lib/actions/update-quantity.action";
import { deleteProduct } from "@/lib/actions/remove-product.actions";
import PersonalCartCarousel from "../personal-cart-carousel/personal-cart-carousel";

export default function CartData() {
  const { status } = useSession();
  const [guestCart, setGuestCart] = useState<any[]>([]);
  const t = useTranslations("cart");
  // display number of products in scroll
  const ITEMS_PER_LOAD = 3;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const queryClient = useQueryClient();

  // guest → read from localStorage
  useEffect(() => {
    if (status === "unauthenticated") {
      const cart = JSON.parse(localStorage.getItem("guest-cart") || "[]");
      setGuestCart(cart);
    }
  }, [status]);

  // authenticated → fetch from backend
  const { data, isLoading, error } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch("/api/cart");
      if (!res.ok) throw new Error("Failed to fetch cart");
      return res.json();
    },
    enabled: status === "authenticated",
  });

  // handler clear cart
  const handleClearCart = async () => {
    try {
      await deleteCart(); // استدعاء الـ endpoint
      queryClient.invalidateQueries({ queryKey: ["cart"] }); // تحديث الداتا
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  };

  // handle qunatity
  const handleQuantityChange = async (
    productId: string,
    newQuantity: number
  ) => {
    try {
      await updateCartQuantity(productId, newQuantity);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  // handle delete product
  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  // infinite scroll handler
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
    }
  };

  // guest case
  if (status === "unauthenticated") {
    return (
      <div>
        {guestCart.length === 0 ? (
          <div className="w-[50rem] mx-auto my-10 px-4 py-2 rounded-[1rem]">
            {/* card header */}
            <div className="cart-header flex justify-between items-center mb-4">
              <div className="text-5xl text-zinc-800 font-bold ">
                {t("title")}
                <span className="text-zinc-500 font-normal text-base ms-2">
                  {guestCart.length} {t("products")}
                </span>
              </div>

              {/* clear cart button (disabled) */}
              <div className="clear">
                <Button disabled className="capitalize">
                  <BrushCleaning size={20} /> {t("empty")}
                </Button>
              </div>
            </div>

            {/* card body */}
            <Card>
              <CardContent>
                {/* card image */}
                <Image
                  src="/assets/p0.png"
                  alt="No products"
                  width={250}
                  height={214}
                  className="mx-auto "
                />
                {/* card text */}
                <p className="text-sm font-normal text-zinc-400 ">
                  {t("empty-cart")}
                </p>
              </CardContent>
            </Card>

            {/* continue shopping button */}
            <div className=" text-start py-6">
              <Button variant={"destructive"} className="capitalize">
                <MoveLeft size={20} />
                <Link href="/">{t("continue-shopping")}</Link>
              </Button>
            </div>
          </div>
        ) : (
          // in case cart is full display cart guest component
          <CartGuestData />
        )}
      </div>
    );
  }

  // user login
  if (status === "loading" || isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading cart</p>;

  const cartItems = data?.cart?.cartItems ?? [];
  const visibleItems = cartItems.slice(0, visibleCount);

  return (
    <>
      <div className="px-20">
        {/* in case cart empty */}
        {data?.numOfCartItems === 0 ? (
          <div className="w-[50rem] mx-auto my-10 px-4 py-2 rounded-[1rem] ">
            {/* cart header */}
            <div className="cart-header flex justify-between items-center mb-4 ">
              <div className="text-5xl text-zinc-800 font-bold ">
                {t("title")}
                <span className="text-zinc-500 font-normal text-base ms-2">
                  {data?.numOfCartItems} {t("products")}
                </span>
              </div>
              <div className="clear">
                <Button disabled className="capitalize">
                  <BrushCleaning size={20} /> {t("empty")}
                </Button>
              </div>
            </div>

            {/* card body */}
            <Card>
              <CardContent>
                <Image
                  src="/assets/p0.png"
                  alt="No products"
                  width={250}
                  height={214}
                  className="mx-auto "
                />
                <p className="text-sm font-normal text-zinc-400 ">
                  {t("empty-cart")}
                </p>
              </CardContent>
            </Card>

            {/* continue shopping button */}
            <div className="text-start py-6">
              <Button variant={"destructive"} className="capitalize">
                <MoveLeft size={20} />
                <Link href="/">{t("continue-shopping")}</Link>
              </Button>
            </div>
          </div>
        ) : (
          // in case cart is not empty
          <div className="w-[48rem]">
            {/* cart header */}
            <div className="cart-header flex justify-between items-center mb-4 w-full">
              <div className="text-5xl text-zinc-800 font-bold">
                {t("title")}
                <span className="text-zinc-500 font-normal text-base ms-2">
                  {data?.numOfCartItems} {t("products")}
                </span>
              </div>
              <Button
                variant="light"
                className="capitalize"
                onClick={handleClearCart}
              >
                <BrushCleaning size={20} /> {t("empty")}
              </Button>
            </div>

            {/* cart body */}
            <Card className="mb-6 w-full">
              <CardContent
                className="max-h-[32rem] overflow-y-auto hide-scrollbar"
                onScroll={handleScroll}
              >
                {visibleItems.map((item: any) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center border-b py-4"
                  >
                    {/* card content */}
                    <div className="flex items-center gap-4">
                      {/* card image */}
                      <img
                        src={item.product.imgCover}
                        alt={item.product.title}
                        width={100}
                        className="rounded h-32 object-cover"
                      />

                      <div className="flex flex-col justify-between items-start h-32 ">
                        {/* card title and rating */}
                        <div>
                          <p className="font-semibold text-lg text-start text-maroon-600 capitalize pb-2">
                            {item.product.title}
                          </p>
                          <div className="font-normal text-start text-base">
                            ⭐{t("rating")}:
                            <span className="font-medium">
                              {item.product.rateAvg}
                            </span>
                            <span className="text-blue-600 font-medium text-base ms-2">
                              ({item.product.rateCount} {t("ratings")})
                            </span>
                          </div>
                        </div>

                        {/* product price */}
                        <p>
                          <span className="text-maroon-600 text-sm font-medium me-1">
                            (x{item?.quantity})
                          </span>
                          <span className="font-bold text-2xl">
                            {item.price * item.quantity} EGP
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between items-end h-32">
                      {/* remove product */}
                      <Button
                        variant="destructive"
                        className="capitalize "
                        onClick={() => handleDeleteProduct(item.product._id)}
                      >
                        <Trash2 /> {t("remove-product")}
                      </Button>

                      {/* quantity */}
                      <div className="flex items-center gap-2 ">
                        {/* minus */}
                        <Button
                          variant="secondary"
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            handleQuantityChange(
                              item.product._id,
                              item.quantity - 1
                            )
                          }
                        >
                          <Minus size={20} />
                        </Button>

                        {/* input value */}
                        <Input
                          type="number"
                          value={item.quantity}
                          className="w-24 text-center p-4 border border-zinc-300 rounded-[1rem]"
                          readOnly
                        />

                        {/* plus */}
                        <Button
                          variant="secondary"
                          onClick={() =>
                            handleQuantityChange(
                              item.product._id,
                              item.quantity + 1
                            )
                          }
                        >
                          <Plus size={20} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {/* loading on scroll */}
                {visibleCount < cartItems.length && (
                  <p className="text-center py-4 text-zinc-500">
                    Loading more...
                  </p>
                )}
              </CardContent>
            </Card>
            <div className="text-start py-6 w-full">
              <Button variant={"destructive"} className="capitalize">
                <MoveLeft size={20} />
                <Link href="/">{t("continue-shopping")}</Link>
              </Button>
            </div>
          </div>
        )}

        {/* Products you may like  */}
        <PersonalCartCarousel />
      </div>
    </>
  );
}
