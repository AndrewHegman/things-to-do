import { StateCreator } from "zustand";

export enum Modal {
  Loading = "loading",
  Error = "error",
}

export interface ModalsSlice {
  modals: Modal[];
  openModal: (modals: Modal) => void;
  closeModal: (modal: Modal) => void;
}

export const createModalsSlice: StateCreator<ModalsSlice, [], [], ModalsSlice> = (set) => ({
  modals: [],
  openModal: (modal: Modal) =>
    set((state) => {
      const { modals } = state;
      const idx = modals.findIndex((stateModal) => stateModal === modal);

      if (idx >= 0) {
        console.warn(`-WARNING- '${modal}' modal is already opened, not opening another`);
        return { modals };
      }

      return { modals: [...modals, modal] };
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
  closeAllModals: () => set({ modals: [] }),
});
