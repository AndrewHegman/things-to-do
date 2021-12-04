import { categories, selectors as categoriesSelectors } from "./categories";
import { categoriesDialog, selectors as categoriesDialogSelectors } from "./categoriesDialog";
import { toDoItems, selectors as toDoItemsSelectors } from "./toDoItems";

export * from "./hooks";

export const actions = {
  categories: categories.actions,
  toDoItems: toDoItems.actions,
  categoriesDialog: categoriesDialog.actions,
};

export const selectors = {
  categories: categoriesSelectors,
  toDoItems: toDoItemsSelectors,
  categoriesDialog: categoriesDialogSelectors,
};
