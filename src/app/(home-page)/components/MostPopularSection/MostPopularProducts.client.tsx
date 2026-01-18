"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MostPopularTabs from "./MostPopularTabs";
import ProductCard from "@/components/shared/ProductCard";
import Loading from "@/app/loading";
import { useProducts } from "@/hooks/use-products";

export default function MostPopularProducts({ initialOccasion, occasions, }: MostPopularProductsProps) {

    const router = useRouter();
    const searchParams = useSearchParams();

    // Determine the currently selected occasion
    const [selectedOccasion, setSelectedOccasion] = useState(searchParams.get("occasion") || initialOccasion);

    // Fetch products for the currently selected occasion using React Query
    const { data: products, isLoading } = useProducts({ limit: 12, sort: "-rateCount", occasion: selectedOccasion, });

    // Update the URL search params whenever the selected occasion changes
    useEffect(() => {
        const params = new URLSearchParams();
        params.set("occasion", selectedOccasion);

        router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
    }, [selectedOccasion, router]);


    //  Handle occasion changes
    const handleOccasionChange = (occasionId: string) => {
        if (occasionId === selectedOccasion) return;
        setSelectedOccasion(occasionId);
    };

    return (
        <section className="mb-12 flex flex-col h-full gap-6 w-full">
            <div className="flex justify-between">
                {/* TODO: Waiting for header component */}
                <h2 className="text-maroon-600 text-2xl font-semibold">Most Popular</h2>
                <MostPopularTabs
                    occasions={occasions}
                    selected={selectedOccasion}
                    onChange={handleOccasionChange}
                />
            </div>

            {isLoading && <Loading />}

            {/* Products grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {products?.products?.length === 0 && !isLoading && (
                    <p className="col-span-full text-center text-lg text-maroon-600">
                        No products found for this occasion.
                    </p>
                )}

                {products?.products?.map((product: Product) => (
                    <ProductCard
                        key={product._id}
                        img={product.imgCover}
                        title={product.title}
                        price={product.price}
                        priceAfterDiscount={product.priceAfterDiscount}
                    />
                ))}
            </div>
        </section>
    );
}
