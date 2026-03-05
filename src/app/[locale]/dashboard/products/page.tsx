import { Link } from "@/i18n/navigation";
import ProductList from "./_components/product-list";

export default function page() {
  return (
    <div>
      {/* #TODO: Waiting Add-new-product button*/}
      <Link
        href={"/dashboard/products/create-product"}
        className="text-white bg-maroon-600"
      >
        add new Product
      </Link>
      {/* #TODO: Waiting task */}
      <ProductList />
    </div>
  );
}
