"use client";

import { useSearchParams } from "next/navigation";
import { useCategories } from "@/hooks/use-categories";
import { useState, useEffect } from "react";
import CategoriesHeader from "./categories-header";
import CategoriesTable from "./categories-table";
import PaginationWrapper from "@/components/ui/PaginationWrapper";

export default function CategoriesPageContent() {
  const searchParams = useSearchParams();
  const searchPage = Number(searchParams.get("page") || "1");

  const [search, setSearch] = useState("");

  const { data, isLoading } = useCategories({
    page: searchPage,
    search,
    limit: 10,
  });

  // Reset page to 1 when search changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    // replace URL without refreshing
    // use router.replace if needed
  }, [search]);

  return (
    <>
      <CategoriesHeader search={search} onSearchChange={setSearch} />

      <CategoriesTable
        categories={data?.categories || []}
        isLoading={isLoading}
      />

      {data?.metadata && (
        <PaginationWrapper
          totalPages={data.metadata.totalPages}
          currentPage={searchPage}
          onPageChange={(page) => {
            const params = new URLSearchParams(searchParams.toString());
            if (page === 1) params.delete("page");
            else params.set("page", page.toString());
            const newUrl = params.toString()
              ? `/en/dashboard/categories?${params}`
              : "/en/dashboard/categories";
            window.history.pushState({}, "", newUrl);
          }}
          searchParams={{ page: searchPage.toString() }}
          className="mt-10 flex justify-center"
        />
      )}
    </>
  );
}
