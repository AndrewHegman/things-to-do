import { actionTypes, CategoryActionTypes, CategoriesState } from "./types";

export const initialState: CategoriesState = {
  categories: [],
  currentCategory: {
    key: "",
    pathName: "",
    displayName: "",
  },
};

export const categoriesReducer = (state = initialState, action: CategoryActionTypes): CategoriesState => {
  switch (action.type) {
    case actionTypes.SET_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    case actionTypes.SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.category,
      };

    default:
      return state;
  }
};
