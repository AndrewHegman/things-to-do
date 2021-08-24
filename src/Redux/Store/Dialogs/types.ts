/**
 * This is a stub of a possible approach to incorporate Dialogs into redux.
 * At the time of writing, it seems like it would be too messy with all the different variations of dialogs
 * although a different approach of sending an object with props may work.
 */

import { ActionType } from "../../common";

export const actionTypes = {
  OPEN_DIALOGS: "OPEN_DIALOGS",
  CLOSE_DIALOGS: "CLOSE_DIALOGS",
} as const;

export enum Dialog {}

export interface CommonState {
  dialogs: Dialog[];
}

export const DialogActions = {
  openDialogs: (dialogs: Dialog[]) =>
    ({
      type: actionTypes.OPEN_DIALOGS,
      dialogs,
    } as const),

  closeDialogs: (dialogs: Dialog[]) =>
    ({
      type: actionTypes.CLOSE_DIALOGS,
      dialogs,
    } as const),
};

export type DialogActionTypes = ActionType<typeof DialogActions>;
