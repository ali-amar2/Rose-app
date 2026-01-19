import { getProducts } from "@/lib/services/products.service";
import { getOccasions } from "@/lib/services/occasions.service";
import MostPopularProducts from "./most-popular-products";

export default async function MostPopularSection() {
  // occassions Query
  const occasionsData = await getOccasions();
  const occasions = occasionsData.occasions || [];
  const defaultOccasion = occasions[0]?._id || "";

  // products Query
  const initialProducts = await getProducts({
    limit: 12,
    sort: "-rateCount",
    occasion: defaultOccasion,
  });

  return (
    <MostPopularProducts
      initialProducts={initialProducts}
      initialOccasion={defaultOccasion}
      occasions={occasions.slice(0, 4)}
    />
  );
}
