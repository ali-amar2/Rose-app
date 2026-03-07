"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCategories } from "@/hooks/use-categories";
import { useState, useEffect } from "react";
import CategoriesHeader from "./categories-header";
import CategoriesTable from "./categories-table";
import PaginationWrapper from "@/components/ui/PaginationWrapper";

export default function CategoriesPageContent() {
  // Navigation
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  // States
  const [search, setSearch] = useState("");
  // Constants
  const searchPage = Number(searchParams.get("page") || "1");
  // Queries
  const { data, isLoading } = useCategories({
    page: searchPage,
    search,
    limit: 10,
  });

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");
    const newUrl = params.toString() ? `${pathname}?${params}` : pathname;
    router.replace(newUrl);
  }, [search, router, pathname, searchParams]);

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
          searchParams={{ page: searchPage.toString(), search }}
          className="mt-10 flex justify-center"
        />
      )}
    </>
  );
}
