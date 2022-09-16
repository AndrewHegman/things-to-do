import create, { StateCreator } from "zustand";
import { Category, Tag } from "@ttd/graphql";

export interface TagsSlice {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
}

export const createTagsSlice: StateCreator<TagsSlice, [], [], TagsSlice> = (set) => ({
  tags: [],
  setTags: (tags: Tag[]) => set({ tags }),
});
