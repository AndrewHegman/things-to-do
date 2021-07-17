import { categoriesReducer } from "./Categories/reducers";

import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  categories: categoriesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
