import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../Interface/Category";
import type { RootState } from "./store";
import { categories as categoriesData } from "../Data/Category";

interface CategoriesState {
  categories: Category[];
  currentCategory: Category | null;
  isLoading: boolean;
}

const initialState: CategoriesState = {
  categories: [],
  currentCategory: categoriesData[0],
  isLoading: false,
};

export const categories = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setCurrentCategory: (state, action: PayloadAction<Category>) => {
      state.currentCategory = action.payload;
    },
    setCategoriesLoading: (state) => {
      state.isLoading = true;
    },
    setCategoriesLoadingFinished: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setCategories, setCurrentCategory } = categories.actions;

export const selectors = {
  selectCategories: (state: RootState) => state.categories.categories,
  selectCurrentCategory: (state: RootState) => state.categories.currentCategory,
  selectCategoriesLoading: (state: RootState) => state.categories.isLoading,
};

export const categoriesReducer = categories.reducer;
