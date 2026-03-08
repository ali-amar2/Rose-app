import { getProducts } from "@/lib/services/products.service";
import ProductCard from "@/components/shared/product-card";
import PaginationWrapper from "@/components/ui/PaginationWrapper";

export default async function ProductList({
  searchParams,
}: ProductSearchParamsProps) {
  const data = await getProducts({
    category: searchParams.category,
    occasion: searchParams.occasion,
    "price[gte]": searchParams.maxPrice,
    "price[lte]": searchParams.maxPrice,
    rateAvg: searchParams.rateCount,
    page: searchParams.page,
    limit: 12,
  });

  const metadata = data?.metadata;
  console.log(metadata, "Datagiugiugiu");

  return (
    <>
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
      {metadata && metadata.totalPages > 1 && (
        <div className="flex mt-12 col-span-9">
          <PaginationWrapper
            totalPages={metadata?.totalPages}
            searchParams={{ page: String(searchParams.page ?? "") }}
          />
        </div>
      )}
    </>
  );
}
