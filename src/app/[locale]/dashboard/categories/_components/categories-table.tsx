import { Button } from "@/components/ui/button";
import { Category } from "@/lib/types/category";
import { Pencil, Trash2 } from "lucide-react";

type Props = {
  categories: Category[];
  isLoading: boolean;
};

export default function CategoriesTable({ categories, isLoading }: Props) {
  if (isLoading) {
    return <div className="py-10 text-center">Loading...</div>;
  }

  if (!categories.length) {
    return (
      <div className="py-10 text-center text-zinc-500 text-lg">
        No categories found
      </div>
    );
  }

  return (
    <table className="w-full border-collapse table-fixed">
      <thead className="bg-red-50">
        <tr className="text-left border-b bg-zinc-50 ">
          <th className="py-3 w-64 pl-5">Name</th>
          <th>Products</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {categories.map((category) => (
          <tr
            key={category._id}
            className="border-b transition-colors hover:bg-maroon-50"
          >
            <td className="capitalize py-3 pl-5 font-medium duration-300">
              {category.name}
            </td>
            <td className="text-zinc-600">{category.productsCount} Products</td>
            <td className="text-right space-x-2">
              <Button
                size="sm"
                variant="inactive"
                className="text-blue-600 bg-blue-600/10 hover:bg-blue-600/15 transition-colors duration-300 font-medium"
              >
                <Pencil size={15} /> Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className=" text-red-600 bg-red-600/10 hover:bg-red-600/15 transition-colors duration-300 font-medium"
              >
                <Trash2 size={15} /> Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
