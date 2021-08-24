import { DialogActions, DialogActionTypes, Dialog } from "./types";

export const dialogs = {
  openDialogs: (dialogs: Dialog[]): DialogActionTypes => {
    return DialogActions.openDialogs(dialogs);
  },
  closeDialogs: (dialogs: Dialog[]): DialogActionTypes => {
    return DialogActions.closeDialogs(dialogs);
  },
} as const;
