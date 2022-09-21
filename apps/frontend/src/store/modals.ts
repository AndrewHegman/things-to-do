import { StateCreator } from "zustand";

export enum Modal {
  Loading = "loading",
  Error = "error",
}

export interface ModalsSlice {
  modals: Modal[];
  message: string;
  openModal: (modals: Modal) => void;
  closeModal: (modal: Modal) => void;
}

export const createModalsSlice: StateCreator<ModalsSlice, [], [], ModalsSlice> = (set) => ({
  modals: [],
  message: "",
  openModal: (modal: Modal, message?: string) =>
    set((state) => {
      const { modals } = state;
      const idx = modals.findIndex((stateModal) => stateModal === modal);

      if (idx >= 0) {
        console.warn(`-WARNING- '${modal}' modal is already opened, not opening another`);
        return { modals, message };
      }

      return { modals: [...modals, modal], message };
    }),
  closeModal: (modal: Modal) =>
    set((state) => {
      const { modals } = state;
      const idx = modals.findIndex((stateModal) => stateModal === modal);

      if (idx < 0) {
        console.warn(`-WARNING- '${modal}' modal is not opened, not closing anything`);
        return { modals };
      }

      return { modals: [...modals.slice(0, idx), ...modals.slice(idx + 1)] };
    }),
  closeAllModals: () => set({ modals: [], message: "" }),
});
