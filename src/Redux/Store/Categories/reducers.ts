import { actionTypes, CategoryActionTypes, CategoriesState } from "./types";

export const initialState: CategoriesState = {
  categories: [],
  isCategoriesLoading: false,
  currentCategory: {
    key: "",
    pathName: "",
    displayName: "",
  },
};

export const categoriesReducer = (state = initialState, action: CategoryActionTypes): CategoriesState => {
  switch (action.type) {
    case actionTypes.WAIT_ON_REQUEST:
      return {
        ...state,
        isCategoriesLoading: true,
      };

    case actionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
        isCategoriesLoading: false,
      };

    case actionTypes.SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.category,
        isCategoriesLoading: false,
      };

    default:
      return state;
  }
};
