import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Rating from "@/components/ui/rating"

export default function ProductCard({ img, title, price, priceAfterDiscount, }: ProductCardProps) {
    return (
        <Card className="border-none shadow-none">
            <CardContent className="flex aspect-square flex-col h-full">

                {/* Product image */}
                <div className="relative w-full h-72">
                    <Image src={img} alt={title} fill className="rounded-md w-full" />
                </div>

                {/* TODO: Waiting for system design to implement the product badge  */}

                <div className="flex flex-col space-y-1">
                    {/* Product title */}
                    <p className="mt-2 font-semibold capitalize text-lg text-maroon-600 line-clamp-1">
                        {title}
                    </p>

                    <div className="flex justify-between items-center">

                        {/* Rating and price */}
                        <div className="flex flex-col">
                            <Rating />
                            <span className="text-maroon-600 font-semibold">
                                {priceAfterDiscount} EGP{" "}
                                <span className="text-zinc-500 line-through">
                                    {price} EGP
                                </span>
                            </span>
                        </div>

                        {/* Add to cart button */}
                        <div className="flex justify-center cursor-pointer items-center w-9 h-9 text-white bg-maroon-600 hover:bg-maroon-700 rounded-full transition-colors duration-200">
                            <ShoppingCart />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
