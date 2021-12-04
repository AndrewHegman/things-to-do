import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tags } from "../Data/Tags";
import { ToDoItem } from "../Interface/ToDoItem";
import type { RootState } from "./store";

interface NewToDoItem extends Omit<ToDoItem, "id"> {}

interface ToDoItems {
  toDoItems: { [key: string]: ToDoItem[] };
  isLoading: boolean;
  newToDoItem: NewToDoItem;
}

const initialState: ToDoItems = {
  toDoItems: {},
  isLoading: false,
  newToDoItem: {
    categoryKey: "",
    name: "",
    tags: [],
  },
};

export const toDoItems = createSlice({
  name: "toDoItems",
  initialState,
  reducers: {
    setToDoItems: (state, action: PayloadAction<{ [key: string]: ToDoItem[] }>) => {
      state.toDoItems = action.payload;
    },
    setToDoItemsLoading: (state) => {
      state.isLoading = true;
    },
    setToDoItemsLoadingFinished: (state) => {
      state.isLoading = false;
    },
    updateNewToDoItem: (state, action: PayloadAction<Partial<NewToDoItem>>) => {
      state.newToDoItem = { ...state.newToDoItem, ...action.payload };
    },
    removeTagFromNewToDoItem: (state, action: PayloadAction<string>) => {
      const { tags } = state.newToDoItem;
      const tagId = action.payload;

      const idx = tags.findIndex((tag) => tag.id === tagId);
      state.newToDoItem.tags = [...tags.slice(0, idx), ...tags.slice(idx + 1)];
    },
    clearNewToDoItem: (state) => {
      state.newToDoItem = {
        categoryKey: "",
        name: "",
        tags: [],
      };
    },
  },
});

export const { setToDoItems, setToDoItemsLoading } = toDoItems.actions;

export const selectors = {
  selectCurrentToDoItems: (state: RootState) =>
    state.categories.currentCategory ? state.toDoItems.toDoItems[state.categories.currentCategory.key] : null,
  selectToDoItemsLoading: (state: RootState) => state.toDoItems.isLoading,
  selectNewToDoItem: (state: RootState) => state.toDoItems.newToDoItem,
};

export const toDoItemsReducer = toDoItems.reducer;
