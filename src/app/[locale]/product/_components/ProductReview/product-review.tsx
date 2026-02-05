import { Star, StarHalf } from "lucide-react";
import ReviewList from "./review-list";
import ReviewForm from "./review-form";

// component
export default function ProductReviews({ productId }: { productId: string }) {
  return (
    <section className="mt-12">
      {/* Header */}
      <div className="relative mb-6">
        <h2 className="font-bold text-maroon-700 text-3xl">Product Reviews</h2>
        <div className="h-[2px] w-[3%] bg-softPink-600" />
        <div className="absolute bottom-0 left-0 w-[9%] h-4 bg-softPink-100 -z-10 rounded-r-2xl" />
      </div>

      {/* General Rating */}
      <div className="mb-6">
        <p className="text-lg font-medium">General rating:</p>
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl font-bold">4.5</span>
          <span className="text-sm text-gray-400">(8 ratings)</span>
        </div>
        <div className="flex gap-1">
          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
          <StarHalf className="w-4 h-4 fill-amber-500 text-amber-500" />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mb-6" />

      {/* Reviews Section */}
      <div className="flex gap-10">
        {/* Reviews List */}
        <div className="flex-1 max-w-[650px]">
          <ReviewList productId={productId} />
        </div>

        {/* Vertical Divider */}
        <div className="w-px bg-gray-200" />

        {/* Review Form */}
        <ReviewForm productId={productId} />
      </div>
    </section>
  );
}
