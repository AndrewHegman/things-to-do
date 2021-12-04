import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface CategoriesDialogState {
  isOpen: boolean;
}

const initialState: CategoriesDialogState = {
  isOpen: false,
};

export const categoriesDialog = createSlice({
  name: "categoriesDialog",
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = true;
    },
    close: (state) => {
      state.isOpen = false;
    },
  },
});

export const { open, close } = categoriesDialog.actions;

export const selectors = {
  selectIsOpen: (state: RootState) => state.categoriesDialog.isOpen,
};

export const categoriesDialogReducer = categoriesDialog.reducer;
