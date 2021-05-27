import { createAction } from "@reduxjs/toolkit";
import { Category } from "../../Interface/Category";

export const actions = {
  setCurrentCategory: createAction<Category>("setCurrentAction"),
  addCategories: createAction<Category[]>("addCategories"),
  addCategory: createAction<Category>("addCategory"),
};
