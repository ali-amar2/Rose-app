import { Link } from "@/i18n/navigation";
import { getProducts } from "@/lib/services/products.service";
import React from "react";

export default async function ProductList() {
  const data = await getProducts();

  return (
    <div>
      {data.products.map((product) => (
        <Link
          href={`/dashboard/products/update-product?productId=${product._id}`}
          key={product._id}
          className=" block"
        >
          {product.title}
        </Link>
      ))}
    </div>
  );
}
