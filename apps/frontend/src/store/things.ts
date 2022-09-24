import { Category, Thing } from "@ttd/graphql";
import create, { StateCreator } from "zustand";

export interface ThingsSlice {
  things: Thing[];
  setThings: (things: Thing[]) => void;
  currentThing: Thing | null;
  setCurrentThing: (currentThing: Thing | null) => void;
}

export const createThingsSlice: StateCreator<ThingsSlice, [], [], ThingsSlice> = (set) => ({
  things: [],
  setThings: (things: Thing[]) => set({ things }),
  currentThing: null,
  setCurrentThing: (currentThing: Thing | null) => set({ currentThing }),
});
