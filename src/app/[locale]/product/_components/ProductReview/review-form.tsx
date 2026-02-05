"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { createReview } from "@/lib/services/reviews.service";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// type
type ReviewFormProps = {
  productId: string;
};

// component
export default function ReviewForm({ productId }: ReviewFormProps) {
  // state
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // hooks
  const router = useRouter();
  const { data: session, status } = useSession();

  // handle submit
  async function handleSubmit() {
    // Validate
    if (!rating || !title || !comment) {
      setError("Please fill all fields");
      return;
    }

    setIsSubmitting(true);
    setError("");

    // Not Working
    try {
      const token = (session?.user as any)?.accessToken;

      if (!token) {
        setError("Please logout and login again");
        return;
      }

      await createReview(token, {
        product: productId,
        rating,
        title,
        comment,
      });

      // Success - reset form
      setRating(0);
      setTitle("");
      setComment("");
      setError("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Show loading state
  if (status === "loading") {
    return (
      <div className="w-[520px] flex items-center justify-center h-64">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  // Render
  return (
    <div className="w-[520px] relative">
      {/* Rating */}
      <div className="flex items-center gap-3 mb-6">
        <p className="text-lg font-medium">Your rating:</p>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              onClick={() => setRating(i + 1)}
              className={`w-5 h-5 cursor-pointer transition-colors ${
                i < rating ? "fill-amber-500 text-amber-500" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Title */}
      <div className="mb-4">
        <Label className="text-sm mb-1 block font-medium">Title</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter review title"
          disabled={status !== "authenticated"}
        />
      </div>

      {/* Comment */}
      <div className="mb-6">
        <Label className="text-sm mb-1 block font-medium">Review</Label>
        <Textarea
          rows={5}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What do you think of this product?"
          disabled={status !== "authenticated"}
        />
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 mb-4">
          <p className="text-red-600 text-sm text-center">{error}</p>
        </div>
      )}

      {/* Submit */}
      <Button
        onClick={handleSubmit}
        disabled={isSubmitting || status !== "authenticated"}
        className="w-full"
      >
        {isSubmitting && (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
        )}
        {isSubmitting ? "Sumitting..." : "Add Review"}
      </Button>

      {/* Unauthenticated Overlay */}
      {status !== "authenticated" && (
        <div className="absolute inset-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-md flex items-center justify-center z-10">
          <div className="text-center px-4">
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              Please login to review this product
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
