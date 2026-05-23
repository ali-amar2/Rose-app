import { Skeleton } from "@/components/ui/skeleton";

export default function CartPageSkeleton() {
  return (
    <section className="grid gap-8 lg:grid-cols-[1fr_360px]">
      {/* Cart Items */}
      <div>
        {/* Header */}
        <div className="mb-8 flex items-end gap-4">
          <Skeleton className="h-9 w-28 sm:h-10 sm:w-36" />
          <Skeleton className="h-4 w-20 sm:h-5 sm:w-24" />
        </div>

        {/* Items */}
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <article
              key={index}
              className="
                flex flex-col gap-4 rounded-2xl border bg-white p-4
                sm:flex-row
              "
            >
              {/* Image */}
              <Skeleton
                className="
                  h-44 w-full rounded-xl
                  sm:h-28 sm:w-28 sm:flex-shrink-0
                "
              />

              {/* Content */}
              <div className="flex flex-1 flex-col justify-between">
                {/* Top */}
                <div className="flex justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-5 w-3/4 sm:w-52" />
                    <Skeleton className="h-4 w-24" />
                  </div>

                  <Skeleton className="h-9 w-9 rounded-md" />
                </div>

                {/* Bottom */}
                <div className="mt-6 flex items-center justify-between">
                  <Skeleton className="h-6 w-24" />

                  <div className="flex items-center gap-2">
                    <Skeleton className="h-9 w-9 rounded-md" />
                    <Skeleton className="h-5 w-6" />
                    <Skeleton className="h-9 w-9 rounded-md" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Summary */}
      <aside
        className="
          h-fit rounded-2xl border bg-white p-6
          lg:sticky lg:top-24
        "
      >
        <Skeleton className="mb-6 h-8 w-32" />

        <div className="space-y-5">
          <div className="flex justify-between">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-20" />
          </div>

          <div className="flex justify-between">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-16" />
          </div>

          <div className="border-t pt-5">
            <div className="flex justify-between">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-7 w-28" />
            </div>
          </div>

          <Skeleton className="h-11 w-full rounded-xl" />
        </div>
      </aside>
    </section>
  );
}
