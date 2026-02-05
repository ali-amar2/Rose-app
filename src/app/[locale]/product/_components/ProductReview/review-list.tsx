import { Star } from "lucide-react";
import { getAllReviews } from "@/lib/services/reviews.service";
import { Review } from "@/lib/types/review";

// component
export default async function ReviewList({ productId }: { productId: string }) {
  const response = await getAllReviews();
  const reviews: Review[] = response?.reviews ?? [];

  // filter
  const productReviews = reviews.filter(
    (review) => review.status === "approved" && review.product._id === productId
  );

  // no reviews
  if (productReviews.length === 0) {
    return (
      <p className="text-sm text-gray-400">No reviews yet for this product.</p>
    );
  }

  // render
  return (
    <div className="max-w-[650px] max-h-[600px] overflow-y-auto pr-4 space-y-6">
      {productReviews.map((review, index) => (
        <div
          key={review._id}
          className={index !== 0 ? "pt-6 border-t border-gray-200" : ""}
        >
          {/* User Info */}
          <div className="flex items-center gap-3 mb-2">
            <img
              src={review.user.photo}
              alt={review.user.firstName}
              className="w-11 h-11 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold">
                {review.user.firstName} {review.user.lastName}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating
                    ? "fill-amber-500 text-amber-500"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">
              ({review.rating})
            </span>
          </div>

          {/* Review Content */}
          <h4 className="text-sm font-semibold mb-1">{review.title}</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            {review.comment}
          </p>
        </div>
      ))}
    </div>
  );
}
