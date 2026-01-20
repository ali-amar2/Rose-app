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

export type MostPopularTabsProps = {
  occasions: Occasion[];
  activeOccasion: string;
};

export type OccProps = {
  searchParams?: {
    occasion?: string;
  };
};
