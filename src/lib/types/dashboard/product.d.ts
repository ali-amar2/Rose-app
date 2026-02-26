// Types
export interface AllStatisticsResponse {
  message: string;
  statistics: {
    overall: OverallStats;
    products: {
      productsByCategory: ProductByCategory[];
      topSellingProducts: TopSellingProduct[];
      lowStockProducts: LowStockProduct[];
    };
  };
}
export interface TopSellingProduct {
  _id: string;
  title: string;
  imgCover: string;
  price: number;
  sold: number;
}

export interface LowStockProduct {
  _id: string;
  title: string;
  imgCover: string;
  price: number;
  quantity: number;
}

export interface ProductStatisticsResponse {
  message: string;
  statistics: {
    topSellingProducts: TopSellingProduct[];
    lowStockProducts: LowStockProduct[];
  };
}
