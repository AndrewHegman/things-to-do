import { categoriesReducer } from "./Categories/reducers";
import { toDosReducer } from "./ToDos/reducers";
import { commonReducer } from "./Common/reducers";

import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  categories: categoriesReducer,
  toDos: toDosReducer,
  common: commonReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
