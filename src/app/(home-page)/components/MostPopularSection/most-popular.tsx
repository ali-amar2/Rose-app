import Link from "next/link";
import OccasionsTabs from "./occasions-tabs";
import ProductCard from "@/components/shared/product-card";
import { MoveRight } from "lucide-react";

export default function MostPopular({
  occasions,
  initialOccasion,
  initialProducts,
}: MostPopularProductsProps) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Most Popular</h2>

        <div>
          <OccasionsTabs
            occasions={occasions}
            activeOccasion={initialOccasion}
          />
        </div>
      </div>

      {initialProducts.products.length === 0 ? (
        <p className="flex justify-center items-center text-maroon-600 text-lg py-5">
          No products found for this occasion
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {initialProducts.products.map((product) => (
            <ProductCard
              key={product._id}
              img={product.imgCover}
              title={product.title}
              price={product.price}
              priceAfterDiscount={product.priceAfterDiscount}
              quantity={product.quantity}
              sold={product.sold}
            />
          ))}
        </div>
      )}
      {initialProducts.products.length !== 0 && <Link href={`/products`} className='flex gap-2 justify-end text-maroon-700 font-bold'>View More <MoveRight /></Link>}
    </section>
  );
}
