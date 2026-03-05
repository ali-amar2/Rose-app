import { getCategory } from "@/lib/services/single-category.service";
import UpdateCategoryForm from "../_components/update-category-form";
import SetBreadcrumb from "../../../_components/breadCrumb/set-breadcrumb";

export default async function Page({ params }: { params: { id: string } }) {
  const category = await getCategory(params.id);
  const id = params.id;

  return (
    <>
      <SetBreadcrumb label={`Update Category : ${category?.name}`} />
      <UpdateCategoryForm id={id} defaultName={category?.name || ""} />
    </>
  );
}
