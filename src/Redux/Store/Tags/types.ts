import { ActionType } from "../../common";
import { Tag } from "../../../Interface/Tags";

export const actionTypes = {
  SET_TAGS: "SET_TAGS",
} as const;

export interface TagsState {
  tags: Tag[];
}

export const TagsActions = {
  setTags: (tags: Tag[]) =>
    ({
      type: actionTypes.SET_TAGS,
      tags,
    } as const),
};

export type TagsActionTypes = ActionType<typeof TagsActions>;
