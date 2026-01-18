declare type Occasion = {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  isSuperAdmin: boolean;
  productsCount: number;
};
declare type MostPopularTabsProps = {
  occasions: Occasion[];
  selected: string;
  onChange: (id: string) => void;
};
