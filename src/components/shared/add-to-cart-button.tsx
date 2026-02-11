"use client";

import { Button } from "@/components/ui/button";
import { useAddToCart } from "@/app/[locale]/(homepage)/products/[id]/_hooks/use-add-to-cart";
import { useToast } from "@/hooks/use-toast";

type AddToCartButtonProps = {
  productId: string;
  quantityInStock: number;
  children: React.ReactNode; // 👈 dynamic content
  className?: string;
};

// type AddToCartButtonProps = {
//   product: {
//     _id: string;
//     title: string;
//     imgCover: string;
//     price: number;
//     priceAfterDiscount?: number;
//     rateAvg: number;
//     rateCount: number;
//     quantity: number; // stock
//   };
//   children: React.ReactNode;
//   className?: string;
// };

export default function AddToCartButton({
  productId,
  quantityInStock,
  children,
  className,
}: AddToCartButtonProps) {
  const { mutate, isPending } = useAddToCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (quantityInStock < 1) {
      toast({
        description: "Sorry, this product is out of stock",
        variant: "destructive",
      });
      return;
    }

    mutate({ product: productId, quantity: 1 });
  };

  return (
    <Button
      onClick={handleAddToCart}
      isLoading={isPending}
      disabled={isPending}
      className={className}
    >
      {children}
    </Button>
  );
}

// export default function AddToCartButton({
//   product,
//   children,
//   className,
// }: AddToCartButtonProps) {
//   const { mutate, isPending } = useAddToCart();
//   const { toast } = useToast();

//   const handleAddToCart = () => {
//     if (product.quantity < 1) {
//       toast({
//         description: "Sorry, this product is out of stock",
//         variant: "destructive",
//       });
//       return;
//     }

//     mutate({
//       product: product._id,
//       quantity: 1,

//       // 👇 مهم للـ guest
//       guestSnapshot: {
//         productId: product._id,
//         title: product.title,
//         imgCover: product.imgCover,
//         price: product.priceAfterDiscount ?? product.price,
//         rateAvg: product.rateAvg,
//         rateCount: product.rateCount,
//       },
//     });
//   };

//   return (
//     <Button
//       onClick={handleAddToCart}
//       isLoading={isPending}
//       disabled={isPending}
//       className={className}
//     >
//       {children}
//     </Button>
//   );
// }
