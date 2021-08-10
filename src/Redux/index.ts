import * as categoriesActions from "./Store/Categories/actions";
import * as commonActions from "./Store/Common/actions";
import * as toDosActions from "./Store/ToDos/actions";
import * as tagsActions from "./Store/Tags/actions";

import { initialState as categoriesInitialState } from "./Store/Categories/reducers";
import { initialState as toDosInitialState } from "./Store/ToDos/reducers";
import { initialState as commonInitialState } from "./Store/Common/reducers";
import { initialState as tagsInitialState } from "./Store/Tags/reducers";

import * as toDosSelectors from "./Store/ToDos/selectors";

import { RootState } from "./Store/index";

export const actions = {
  ...categoriesActions,
  ...commonActions.common,
  ...toDosActions,
  ...tagsActions,
};

export const selectors = {
  ...toDosSelectors,
};

export const initialState: RootState = {
  categories: {
    ...categoriesInitialState,
  },
  toDos: {
    ...toDosInitialState,
  },
  common: {
    ...commonInitialState,
  },
  tags: {
    ...tagsInitialState,
  },
};
