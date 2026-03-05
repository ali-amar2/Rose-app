// Types
export interface ProductsMetadata {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalItems: number;
  nextPage?: number;
  prevPage?: number;
}

export interface DashboardProduct {
  _id: string;
  title: string;
  slug: string;
  description: string;
  imgCover: string;
  images: string[];
  price: number;
  priceAfterDiscount?: number;
  quantity: number;
  category: string;
  occasion: string;
  sold: number;
  rateAvg: number;
  rateCount: number;
  isSuperAdmin: boolean;
  favoriteId: string | null;
  isInWishlist: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetProductsResponse {
  message: string;
  metadata: ProductsMetadata;
  products: DashboardProduct[];
}