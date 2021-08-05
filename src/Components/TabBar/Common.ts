import { Category } from "../../Interface/Category";

export interface IBaseTabBarProps {
  onCreateNewCategoryAndRedirect?: (newCategory: Category) => void;
  showDrawer?: boolean;
  onDrawerClose?: () => void;
}
