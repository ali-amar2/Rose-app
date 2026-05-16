"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Search, Loader2, Star } from "lucide-react";
import { getProducts } from "@/lib/services/products.service";
import { useSession } from "next-auth/react";
import { getPersonalizedRecommendations } from "@/lib/services/personalized-rec.service";
import { Product } from "@/lib/types/product";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type Recommendation = Product;

type RecommendationsResponse = {
  recommendations: Product[];
};

export default function SearchModule() {
  const t = useTranslations("search");

  const router = useRouter();
  const { data: session, status } = useSession();

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  /* -------------------------
   Close dropdown on outside click
  -------------------------- */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* -------------------------
   Recommendations
  -------------------------- */
  const fetchRecommendations = useCallback(async () => {
    if (status !== "authenticated") {
      setProducts([]);
      setHasMore(false);
      return;
    }

    setLoading(true);

    try {
      const userId = session?.user?._id;

      if (!userId) return;

      const data: RecommendationsResponse =
        await getPersonalizedRecommendations(userId);

      setProducts(data?.recommendations ?? []);
      setHasMore(false);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [session, status]);

  /* -------------------------
   Search products
  -------------------------- */
  const fetchSearchData = useCallback(
    async (isNewSearch = false) => {
      try {
        const currentPage = isNewSearch ? 1 : page;

        const res = await getProducts({
          limit: 5,
          page: currentPage,
          search: keyword.trim(),
        });

        const newItems: Product[] = res.products ?? [];

        setProducts((prev) =>
          isNewSearch ? newItems : [...prev, ...newItems]
        );

        const total = res.metadata?.totalItems ?? 0;

        setHasMore(() => {
          const currentLength = isNewSearch
            ? newItems.length
            : products.length + newItems.length;

          return currentLength < total && newItems.length > 0;
        });

        if (!isNewSearch) setPage((p) => p + 1);
      } catch {
        setHasMore(false);
      }
    },
    [keyword, page, products.length]
  );

  /* -------------------------
   Debounced search
  -------------------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (keyword.trim()) {
        setPage(1);
        fetchSearchData(true);
      } else if (isOpen) {
        fetchRecommendations();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword, isOpen, status, fetchSearchData, fetchRecommendations]);

  const handleFocus = () => setIsOpen(true);

  const handleSelectProduct = useCallback(
    (id: string) => {
      router.push(`/products/${id}`);
      setIsOpen(false);
    },
    [router]
  );

  return (
    <div
      ref={searchRef}
      className="relative flex w-full flex-col"
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
    >
      {/* Input */}
      <div className="relative w-full">
        <label htmlFor="search" className="sr-only">
          {t("placeholder")}
        </label>

        <Input
          id="search"
          ref={inputRef}
          className="h-12 w-full rounded-lg border-maroon-700 pl-10 pr-4 focus-visible:ring-maroon-700"
          placeholder={t("placeholder")}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={handleFocus}
          aria-label={t("placeholder")}
        />

        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute left-0 top-full z-[999] mt-1 w-full overflow-hidden rounded-b-2xl border border-zinc-200 bg-white shadow-xl"
          role="listbox"
        >
          {/* Header */}
          <div className="border-b border-zinc-100 bg-zinc-50 p-3">
            <h4 className="text-sm font-bold text-maroon-700">
              {keyword
                ? `${t("resultsFor")} "${keyword}"`
                : status === "authenticated"
                  ? t("recommended")
                  : t("noRecommendations")}
            </h4>
          </div>

          {/* List */}
          <div id="scrollableDiv" className="h-[350px] overflow-y-auto p-2">
            <InfiniteScroll
              dataLength={products.length}
              next={() => fetchSearchData(false)}
              hasMore={Boolean(keyword) && hasMore}
              loader={
                <div className="flex justify-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin text-maroon-700" />
                </div>
              }
              scrollableTarget="scrollableDiv"
            >
              <div className="flex flex-col gap-2">
                {products.map((product) => (
                  <button
                    key={product._id}
                    onClick={() => handleSelectProduct(product._id)}
                    className="flex w-full items-center justify-between rounded-lg border-b border-zinc-50 p-2 text-left transition-colors hover:bg-zinc-50"
                    role="option"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md bg-zinc-100">
                        <Image
                          src={product.imgCover || "/placeholder.png"}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <h5 className="max-w-[200px] truncate text-sm font-semibold">
                          {product.title}
                        </h5>

                        <p className="text-sm font-bold">
                          {product.priceAfterDiscount || product.price}{" "}
                          <span className="text-xs text-zinc-500">
                            {t("egp")}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                      <span>
                        {t("rating")}: {product.rateAvg}/5
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </InfiniteScroll>

            {!loading && products.length === 0 && (
              <div className="py-10 text-center text-sm text-zinc-400">
                {keyword ? t("noResults") : t("startSearching")}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
