import { Category } from "../../Interface/Category";

export interface IBaseTabBarProps {
  categories: Category[];
  currentCategory: Category;
  onChangeCategory: (id: string) => void;
}
