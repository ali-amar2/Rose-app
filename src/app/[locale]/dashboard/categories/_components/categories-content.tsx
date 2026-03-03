"use client";

import { useState } from "react";
import CategoriesHeader from "./categories-header";
import CategoriesTable from "./categories-table";
import { useCategories } from "@/hooks/use-categories";

export default function CategoriesPageContent() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useCategories({
    page,
    search,
    limit: 10,
  });
  console.log(data?.categories);

  return (
    <>
      <CategoriesHeader search={search} onSearchChange={setSearch} />

      <CategoriesTable
        categories={data?.categories || []}
        isLoading={isLoading}
      />

      {/* {data?.meta && (
        <Pagination
          currentPage={page}
          totalPages={data.meta.totalPages}
          onPageChange={setPage}
        />
      )} */}
    </>
  );
}
