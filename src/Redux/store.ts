import { configureStore } from "@reduxjs/toolkit";
import { categoriesReducer } from "./categories";
import { categoriesDialogReducer } from "./categoriesDialog";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    categoriesDialog: categoriesDialogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
