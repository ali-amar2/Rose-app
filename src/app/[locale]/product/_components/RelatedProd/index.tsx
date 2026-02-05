import RelatedProductsSection from "./related-product";

// type
type RelatedProductsIndexProps = {
  productId: string;
};

// component
export default function RelatedProductsIndex({
  productId,
}: RelatedProductsIndexProps) {
  // Render
  return <RelatedProductsSection productId={productId} />;
}
