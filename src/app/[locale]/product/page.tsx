import ProductReviews from "./_components/product-review/product-review";
import RelatedProductsSection from "./_components/related-prod/related-product";

export default function ProductPage() {
  // TODO: replace with real productId from params
  const ProdId = "673e2e1f1159920171828153";

  return (
    <main className="container mx-auto px-20 py-10">
      {/* Reviews */}
      <ProductReviews productId={ProdId} />

      {/* Related Products */}
      <RelatedProductsSection productId={ProdId} />
    </main>
  );
}
