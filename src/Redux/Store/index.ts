import { categoriesReducer } from "./Categories/reducers";
import { toDosReducer } from "./ToDos/reducers";

import { combineReducers } from "redux";
import { commonReducer } from "./Common/reducers";

export const rootReducer = combineReducers({
  categories: categoriesReducer,
  toDos: toDosReducer,
  common: commonReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
