import { ActionType } from "../../common";
import { Tag } from "../../../Interface/Tags";

export const actionTypes = {
  SET_TAGS: "SET_TAGS",
  SET_SELECTED_TAGS: "SET_SELECTED_TAGS",
  ADD_SELECTED_TAG: "ADD_SELECTED_TAG",
  REMOVE_SELECTED_TAG: "REMOVE_SELECTED_TAG",
} as const;

export interface TagsState {
  tags: Tag[];
  selectedTags: Tag[];
}

export const TagsActions = {
  setTags: (tags: Tag[]) =>
    ({
      type: actionTypes.SET_TAGS,
      tags,
    } as const),
  setSelectedTags: (tags: Tag[]) =>
    ({
      type: actionTypes.SET_SELECTED_TAGS,
      tags,
    } as const),
  addSelectedTag: (tag: Tag) =>
    ({
      type: actionTypes.ADD_SELECTED_TAG,
      tag,
    } as const),
  removeSelectedTag: (tag: Tag) =>
    ({
      type: actionTypes.REMOVE_SELECTED_TAG,
      tag,
    } as const),
};

export type TagsActionTypes = ActionType<typeof TagsActions>;
