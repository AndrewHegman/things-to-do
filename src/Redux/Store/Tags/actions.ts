import { Tag } from "../../../Interface/Tags";
import { TagsActions, TagsActionTypes } from "./types";

export const tags = {
  setTags: (tags: Tag[]): TagsActionTypes => {
    return TagsActions.setTags(tags);
  },
  setSelectedTags: (tags: Tag[]): TagsActionTypes => {
    return TagsActions.setSelectedTags(tags);
  },
  addSelectedTag: (tag: Tag): TagsActionTypes => {
    return TagsActions.addSelectedTag(tag);
  },
  removeSelectedTag: (tag: Tag): TagsActionTypes => {
    return TagsActions.removeSelectedTag(tag);
  },
} as const;
