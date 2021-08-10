import { Tag } from "../../../Interface/Tags";
import { TagsActions, TagsActionTypes } from "./types";

export const tags = {
  setTags: (tags: Tag[]): TagsActionTypes => {
    return TagsActions.setTags(tags);
  },
} as const;
