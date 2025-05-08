export type Category = 'movies' | 'series' | 'categories';

export interface CategoryTab {
  label: string;
  value: Category;
  hasIcon?: boolean;
}

export interface CategoryTabsProps {
  tabs: CategoryTab[];
  activeCategory: Category;
  onTabPress: (value: Category) => void;
  handleCategoriesPress: () => void;
}

export interface CategoriesOverlayProps {
  visible: boolean;
  onClose: () => void;
  genres: {id: number; name: string}[];
  handleGenrePress: (genreId: number) => void;
}
