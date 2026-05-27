import { getProducts } from "@/lib/services/products.service";
import TitleOfSection from "@/components/shared/title-of-section";
import CartPageView from "./_components/cart-page-view";
import { BestSellingCarousel } from "../(homepage)/_components/best-selling-section/best-selling-carousel";
import ContinueShoppingBtn from "./_components/continue-shopping-btn";
import { getTranslations } from "next-intl/server";

export default async function CartPage() {
  // translations
  const t = await getTranslations("cart");

  // Queries
  const data = await getProducts({
    sort: "-sold",
  });

  return (
    <section className="space-y-8 pb-10 mt-6 px-6 md:px-8 lg:px-10 xl:px-14">
      <CartPageView />

      <div aria-labelledby="recommended-products" className="">
        <TitleOfSection
          title=""
          subtitle={t("products-you-may-like")}
          className="justify-start items-start mb-2"
        />

        <div>
          <BestSellingCarousel products={data.products} />
        </div>
      </div>
    </section>
  );
}
