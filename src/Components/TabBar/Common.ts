import { Category } from "../../Interface/Category";

export interface IBaseTabBarProps {
  onCreateNewCategoryAndRedirect?: (newCategory: Category) => void;
  slowMode: boolean;
}
