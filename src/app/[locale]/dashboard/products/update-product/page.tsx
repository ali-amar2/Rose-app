import React from "react";
import UpdateProductForm from "../_components/update-product-form";

type UpdateProductProps = {
  searchParams: {
    productId: string;
  };
};
export default function Page({ searchParams }: UpdateProductProps) {
  return (
    <main className="h-[calc(100vh-70px)] bg-zinc-50 p-7 overflow-auto">
      <UpdateProductForm productId={searchParams.productId} />
    </main>
  );
}
