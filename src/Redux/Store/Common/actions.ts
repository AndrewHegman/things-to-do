import { BackendEndpoint } from "../../../Interface/Endpoints";
import { CommonActions, CommonActionTypes } from "./types";

export const common = {
  setSlowMode: (slowMode: boolean): CommonActionTypes => {
    return CommonActions.setSlowMode(slowMode);
  },
  setSlowModeTime: (slowModeTime: number): CommonActionTypes => {
    return CommonActions.setSlowModeTime(slowModeTime);
  },
  setBackendEndpoint: (backeEndEndpoint: BackendEndpoint): CommonActionTypes => {
    return CommonActions.setBackendEndpoint(backeEndEndpoint);
  },
} as const;
