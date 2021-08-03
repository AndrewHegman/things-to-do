import { actionTypes, ToDosActionTypes, ToDosState } from "./types";

export const initialState: ToDosState = {
  toDos: [],
};

export const toDosReducer = (state = initialState, action: ToDosActionTypes): ToDosState => {
  switch (action.type) {
    case actionTypes.SET_TODOS:
      return {
        ...state,
        toDos: [...action.toDos],
      };

    default:
      return state;
  }
};
