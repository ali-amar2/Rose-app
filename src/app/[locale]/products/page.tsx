import { getProducts } from "@/lib/services/products.service";
import ProductCard from "@/components/shared/product-card";

export default async function page({ searchParams }: ProductSearchParamsProps) {
  const data = await getProducts({
    category: searchParams.category,
    occasion: searchParams.occasion,
    "price[gte]": searchParams["price[gte]"],
    "price[lte]": searchParams["price[gte]"],
    rateAvg: searchParams.rateAvg,
  });

  return (
    <div className="grid grid-cols-12 px-20 py-10 gap-6">
      {/* #TODP: Sidebar */}
      <div className="col-span-3 ">sidebar</div>
      {/* Products */}
      <div className="col-span-9">
        <div className="grid grid-cols-3 gap-5">
          {data.products.map((product: Product) => (
            <ProductCard
              id={product._id}
              key={product._id}
              img={product.imgCover}
              title={product.title}
              price={product.price}
              priceAfterDiscount={product.priceAfterDiscount}
              quantity={product.quantity}
              sold={product.sold}
              rateAvg={product.rateAvg}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
