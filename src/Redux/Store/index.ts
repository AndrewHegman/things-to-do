import { categoriesReducer } from "./Categories/reducers";
import { toDosReducer } from "./ToDos/reducers";
import { commonReducer } from "./Common/reducers";

import { combineReducers } from "redux";
import { tagsReducer } from "./Tags/reducers";

export const rootReducer = combineReducers({
  categories: categoriesReducer,
  toDos: toDosReducer,
  common: commonReducer,
  tags: tagsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
