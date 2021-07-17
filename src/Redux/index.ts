import * as categoriesActions from "./Store/Categories/actions";
import * as commonActions from "./Store/Common/actions";

import { initialState as categoriesInitialState } from "./Store/Categories/reducers";

import { RootState } from "./Store/index";

export const actions = {
  ...categoriesActions,
  ...commonActions.common,
};

export const initialState: RootState = {
  categories: {
    ...categoriesInitialState,
  },
};
