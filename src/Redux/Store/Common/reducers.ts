import { BackendEndpoint } from "../../../Interface/Endpoints";
import { actionTypes, CommonActionTypes, CommonState } from "./types";
require("dotenv");

console.log(process.env.REACT_APP_IS_PROD);
console.log(process.env.REACT_APP_IS_PROD === "true");
console.log(process.env.REACT_APP_IS_PROD === "true" ? BackendEndpoint.BackendDatabaseProd : BackendEndpoint.FrontEndStatic);
export const initialState: CommonState = {
  slowModeTime: 2000,
  isSlowMode: false,
  backendEndpoint:
    process.env.REACT_APP_IS_PROD === "true" ? BackendEndpoint.BackendDatabaseProd : BackendEndpoint.FrontEndStatic,
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

    case actionTypes.SET_BACKEND_ENDPOINT:
      return {
        ...state,
        backendEndpoint: action.backendEndpoint,
      };

    default:
      return state;
  }
};
