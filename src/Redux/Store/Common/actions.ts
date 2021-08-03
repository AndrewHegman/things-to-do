import { CommonActions, CommonActionTypes } from "./types";

export const common = {
  setSlowMode: (slowMode: boolean): CommonActionTypes => {
    return CommonActions.setSlowMode(slowMode);
  },
  setSlowModeTime: (slowModeTime: number): CommonActionTypes => {
    return CommonActions.setSlowModeTime(slowModeTime);
  },
} as const;
