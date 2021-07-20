import { actionTypes, ToDosActionTypes, ToDosState } from "./types";

export const initialState: ToDosState = {
  toDos: [],
  isLoading: false,
  // currentToDos: [],
};

export const toDosReducer = (state = initialState, action: ToDosActionTypes): ToDosState => {
  switch (action.type) {
    case actionTypes.WAIT_ON_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.SET_TODOS:
      return {
        ...state,
        toDos: [...action.toDos],
        isLoading: false,
      };

    // case actionTypes.SET_CURRENT_TODOS:
    //   return {
    //     ...state,
    //     currentToDos: [...action.toDos],
    //   };

    default:
      return state;
  }
};
