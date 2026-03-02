import { Suspense } from "react";
import ProductList from "./_components/product-list";
import { Skeleton } from "@/components/ui/skeleton";

export default async function page({ searchParams }: ProductSearchParamsProps) {
  return (
    <div className="grid grid-cols-12 px-20 py-10 gap-6">
      {/* #TODP: Sidebar */}
      <div className="col-span-3 ">sidebar</div>
      {/* Products */}
      <div className="col-span-9">
        <Suspense
          fallback={
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="h-72 w-full rounded-md" />
              <Skeleton className="h-72 w-full rounded-md" />
              <Skeleton className="h-72 w-full rounded-md" />
            </div>
          }
        >
          <ProductList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
