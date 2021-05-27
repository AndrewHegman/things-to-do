import { createReducer } from "@reduxjs/toolkit";
import { Category } from "../../Interface/Category";
import { actions } from "./commonActions";

type CommonInitialState = {
  currentCategory: Category;
  categories: Category[];
};

const initialState: CommonInitialState = {
  currentCategory: null as unknown as Category, // We can't default to anything since users create their own categories
  categories: [],
};

export const commonReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.setCurrentCategory, (state, action) => {
      state.currentCategory = action.payload;
    })
    .addCase(actions.addCategories, (state, action) => {
      state.categories.push(...action.payload);
    })
    .addCase(actions.addCategory, (state, action) => {
      state.categories.push(action.payload);
    })
    .addDefaultCase((state, action) => {});
});
