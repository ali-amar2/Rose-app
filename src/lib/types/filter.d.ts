declare type ProductSearchParamsProps = {
  searchParams: {
    occasion?: string;
    category?: string;
    "price[gte]"?: number;
    "price[lte]"?: number;
    rateAvg?: number;
  };
};
