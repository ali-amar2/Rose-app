import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "../../../../components/shared/product-card";
import { getProducts } from "@/lib/services/products.service";

export async function BestSellingCarousel() {

    // Queries
    const data = await getProducts({ sort: "-sold", limit: 6 });

    return (
        <Carousel opts={{ align: "start" }} className="w-full h-full">
            <CarouselContent className="ml-0 h-full">
                {data.products.map((product: Product) => (
                    <CarouselItem
                        key={product._id}
                        className="md:basis-1/2 lg:basis-1/3 "
                    >
                        {/* Single product card For each item*/}
                        <ProductCard
                            img={product.imgCover}
                            title={product.title}
                            price={product.price}
                            priceAfterDiscount={product.priceAfterDiscount}
                            quantity={product.quantity}
                            sold={product.sold}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="bg-maroon-600 text-white hover:bg-maroon-700 hover:text-white top-36 left-1" />
            <CarouselNext className="bg-maroon-600 text-white hover:bg-maroon-700 hover:text-white top-36 -right-3" />
        </Carousel>
    );
}
