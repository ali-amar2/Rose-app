import { getProducts } from "@/lib/services/products.service";
import { getOccasions } from "@/lib/services/occasions.service";
import MostPopularProducts from "./MostPopularProducts.client";

export default async function MostPopularSection() {

    // Fetch all occasions from the server (server-side fetch)
    const occasionsData = await getOccasions();
    const occasions = occasionsData.occasions || [];

    const defaultOccasion = occasions[0]?._id || "";

    // Fetch products for the default occasion from the server (server-side fetch)
    const initialProducts = await getProducts({ limit: 12, sort: "-rateCount", occasion: defaultOccasion });

    //  Pass the initial data to the Client Component that handle the interactivity (changing tabs)
    return (
        <MostPopularProducts
            initialProducts={initialProducts}
            initialOccasion={defaultOccasion}
            occasions={occasions.slice(0, 4)}
        />
    );
}
