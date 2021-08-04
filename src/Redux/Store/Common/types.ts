import { ActionType } from "../../common";
import { BackendEndpoint } from "../../../Interface/Endpoints";

export const actionTypes = {
  SET_SLOW_MODE: "SET_SLOW_MODE",
  SET_SLOW_MODE_TIME: "SET_SLOW_MODE_TIME",
  SET_BACKEND_ENDPOINT: "SET_BACKEND_ENDPOINT",
} as const;

export interface CommonState {
  isSlowMode: boolean;
  slowModeTime: number;
  backendEndpoint: BackendEndpoint;
}

export const CommonActions = {
  setSlowMode: (isSlowMode: boolean) =>
    ({
      type: actionTypes.SET_SLOW_MODE,
      isSlowMode,
    } as const),

  setSlowModeTime: (slowModeTime: number) =>
    ({
      type: actionTypes.SET_SLOW_MODE_TIME,
      slowModeTime,
    } as const),
  setBackendEndpoint: (backendEndpoint: BackendEndpoint) => ({
    type: actionTypes.SET_BACKEND_ENDPOINT,
    backendEndpoint,
  }),
};

export type CommonActionTypes = ActionType<typeof CommonActions>;
