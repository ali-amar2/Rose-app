import { Star, StarHalf } from "lucide-react";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import ReviewList from "./review-list";
import ReviewForm from "./review-form";
import { Skeleton } from "@/components/ui/skeleton";

// Type
type ProductReviewsProps = {
  productId: string;
};

// Loading skeleton
function ReviewListSkeleton() {
  return (
    <div className="space-y-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="flex items-center gap-3">
            <Skeleton className="w-11 h-11 rounded-full" />
            <div className="space-y-1">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      ))}
    </div>
  );
}

// Component
export default async function ProductReviews({
  productId,
}: ProductReviewsProps) {
  // Translations
  const t = await getTranslations("reviews");

  // Data
  const STARS = [1, 2, 3, 4, 5];
  const generalRating = 4.5;
  const ratingsCount = 8;

  return (
    <section className="mt-12">
      {/* Header - using relative + after pseudo via tailwind */}
      <div className="relative mb-6">
        <h2 className="font-bold text-maroon-700 text-3xl after:content-[''] after:absolute after:bottom-0 after:start-0 after:w-[9%] after:h-4 after:bg-softPink-100 after:-z-10 after:rounded-e-2xl">
          {t("title")}
        </h2>
        <div className="h-[2px] w-[3%] bg-softPink-600 mt-1" />
      </div>

      {/* General Rating */}
      <div className="mb-6">
        <p className="text-lg font-medium">{t("generalRating")}:</p>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl font-bold">{generalRating}</span>
          <span className="text-sm text-gray-400">
            ({t("ratings", { count: ratingsCount })})
          </span>
        </div>
        <div className="flex gap-1">
          {STARS.map((star) =>
            star <= Math.floor(generalRating) ? (
              <Star
                key={star}
                className="w-4 h-4 fill-amber-500 text-amber-500"
              />
            ) : generalRating % 1 !== 0 && star === Math.ceil(generalRating) ? (
              <StarHalf
                key={star}
                className="w-4 h-4 fill-amber-500 text-amber-500"
              />
            ) : (
              <Star key={star} className="w-4 h-4 text-gray-300" />
            )
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mb-6" />

      {/* Reviews Section */}
      <div className="flex gap-10">
        {/* Reviews List */}
        <div className="flex-1 max-w-[650px]">
          <Suspense fallback={<ReviewListSkeleton />}>
            <ReviewList productId={productId} />
          </Suspense>
        </div>

        {/* Vertical Divider */}
        <div className="w-px bg-gray-200" />

        {/* Review Form */}
        <ReviewForm productId={productId} />
      </div>
    </section>
  );
}
