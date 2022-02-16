import { categories, selectors as categoriesSelectors } from "./categories";
import { categoriesDialog, selectors as categoriesDialogSelectors } from "./categoriesDialog";

export * from "./hooks";

export const actions = {
  categories: categories.actions,
  categoriesDialog: categoriesDialog.actions,
};

export const selectors = {
  categories: categoriesSelectors,
  categoriesDialog: categoriesDialogSelectors,
};
