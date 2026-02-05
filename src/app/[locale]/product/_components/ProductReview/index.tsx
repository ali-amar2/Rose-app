import ProductReviewSection from "./product-review";

// type
type ProductReviewsProps = {
  productId: string;
};

// component
export default function ProductReviews({ productId }: ProductReviewsProps) {
  return <ProductReviewSection productId={productId} />;
}
