import { Link } from "@/i18n/navigation";

export default function page() {
  return <div>
    <Link href={'/dashboard/products/create-product'}>add new Product</Link>
  </div>;
}
