import SessionWrapper from "./_components/ProductReview/session-wrapper";
import ProductReviews from "./_components/ProductReview";
import RelatedProductsIndex from "./_components/RelatedProd";

export default function ProductPage() {
  // Now to test until the product page is completed
  const ProdId = "673e2e1f1159920171828153";

  return (
    <SessionWrapper>
      <main className="container mx-auto px-20 py-10">
        {/* Reviews */}
        <ProductReviews productId={ProdId} />

        {/* Related Products */}
        <RelatedProductsIndex productId={ProdId} />
      </main>
    </SessionWrapper>
  );
}
