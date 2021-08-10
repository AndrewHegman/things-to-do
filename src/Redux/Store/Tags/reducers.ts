import { actionTypes, TagsActionTypes, TagsState } from "./types";

export const initialState: TagsState = {
  tags: [],
};

export const tagsReducer = (state = initialState, action: TagsActionTypes): TagsState => {
  switch (action.type) {
    case actionTypes.SET_TAGS:
      return {
        ...state,
        tags: [...action.tags],
      };

    default:
      return state;
  }
};
