import { actionTypes, CommonActionTypes, CommonState } from "./types";

export const initialState: CommonState = {
  slowModeTime: 2000,
  isSlowMode: false,
};

export const commonReducer = (state = initialState, action: CommonActionTypes): CommonState => {
  switch (action.type) {
    case actionTypes.SET_SLOW_MODE:
      return {
        ...state,
        isSlowMode: action.isSlowMode,
      };

    case actionTypes.SET_SLOW_MODE_TIME:
      return {
        ...state,
        slowModeTime: action.slowModeTime,
      };

    default:
      return state;
  }
};
