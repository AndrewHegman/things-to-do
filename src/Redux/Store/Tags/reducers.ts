import { actionTypes, TagsActionTypes, TagsState } from "./types";

export const initialState: TagsState = {
  tags: [],
  selectedTags: [],
};

export const tagsReducer = (state = initialState, action: TagsActionTypes): TagsState => {
  switch (action.type) {
    case actionTypes.SET_TAGS:
      return {
        ...state,
        tags: [...action.tags],
      };

    case actionTypes.SET_SELECTED_TAGS:
      return {
        ...state,
        selectedTags: [...action.tags],
      };

    case actionTypes.ADD_SELECTED_TAG:
      return {
        ...state,
        selectedTags: [...state.selectedTags, action.tag],
      };

    case actionTypes.REMOVE_SELECTED_TAG:
      return {
        ...state,
        selectedTags: state.selectedTags.filter((tag) => tag.id !== action.tag.id),
      };
    default:
      return state;
  }
};
