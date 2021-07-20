import { ActionType } from "../../common";

export const actionTypes = {
  SET_SLOW_MODE: "SET_SLOW_MODE",
  SET_SLOW_MODE_TIME: "SET_SLOW_MODE_TIME",
} as const;

export interface CommonState {
  isSlowMode: boolean;
  slowModeTime: number;
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
};

export type CommonActionTypes = ActionType<typeof CommonActions>;
