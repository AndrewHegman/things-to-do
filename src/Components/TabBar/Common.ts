import { Category } from "../../Interface/Category";

export interface IBaseTabBarProps {
  categories: Category[];
  currentCategory?: Category;
  onCreateNewCategoryAndRedirect?: (newCategory: Category) => void;
  slowMode: boolean;
}
