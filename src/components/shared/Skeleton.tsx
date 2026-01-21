import { BestSellingCarousel } from "@/app/[locale]/(homepage)/_components/BestSellingSection/best-selling-carousel"
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from "react"

<div className="w-full">
    <Suspense
        fallback={
            <div className="grid grid-cols-3 gap-4">
                <Skeleton className="h-72 w-full rounded-md" />
                <Skeleton className="h-72 w-full rounded-md" />
                <Skeleton className="h-72 w-full rounded-md" />
            </div>
        }
    >
        <BestSellingCarousel />
    </Suspense>
</div>
