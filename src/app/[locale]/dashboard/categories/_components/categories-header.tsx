import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import Link from "next/link";

type Props = {
  search: string;
  onSearchChange: (value: string) => void;
};

export default function CategoriesHeader({ search, onSearchChange }: Props) {
  return (
    <>
      <header className="flex justify-between items-center">
        <h1 className="font-medium text-2xl">All Categories</h1>

        <Link
          href="/dashboard/categories/add-category"
          className="bg-maroon-600 text-white py-2 px-3 rounded-lg hover:bg-maroon-700 transition"
        >
          <span className="flex gap-2 items-center">
            <Plus size={20} />
            Add New Category
          </span>
        </Link>
      </header>

      <Input
        search
        placeholder="Search..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="my-3"
      />
    </>
  );
}
