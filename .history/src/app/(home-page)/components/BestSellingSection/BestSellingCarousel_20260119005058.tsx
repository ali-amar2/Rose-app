import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ProductCard from "../../../../components/shared/ProductCard";
import { getProducts } from "@/lib/services/products.service";

//  Carousel component For displaying best-selling products

export async function BestSellingCarousel() {

    const data = await getProducts({ sort: "-sold", limit: 6 });

    return (
        <Carousel opts={{ align: "start" }} className="w-full h-full ">
            <CarouselContent className="">
                {data.products.map((product: Product) => (
                    <CarouselItem key={product._id} className="md:basis-1/2 lg:basis-1/3 pl-0 ">
                        {/* Single product card For each item*/}
                        <ProductCard
                            img={product.imgCover}
                            title={product.title}
                            price={product.price}
                            priceAfterDiscount={product.priceAfterDiscount}
                        />
                    </CarouselItem>
                ))}
            </CarouselContent >
            <CarouselPrevious className="bg-maroon-600 text-white hover:bg-maroon-700 hover:text-white -left-3" />
            <CarouselNext className="bg-maroon-600 text-white hover:bg-maroon-700 hover:text-white -right-3" />
        </Carousel >
    );
}
