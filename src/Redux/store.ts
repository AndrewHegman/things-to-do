import { configureStore } from "@reduxjs/toolkit";
import { categoriesReducer } from "./categories";
import { categoriesDialogReducer } from "./categoriesDialog";
import { toDoItemsReducer } from "./toDoItems";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    toDoItems: toDoItemsReducer,
    categoriesDialog: categoriesDialogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
