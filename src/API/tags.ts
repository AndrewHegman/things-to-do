import { resolveSlowPromiseWrapper, rejectSlowPromiseWrapper } from "./common";
import { Tags } from "../Data/Tags";
import { Tag } from "../Interface/Tags";
import { v4 as uuidv4 } from "uuid";

export const tags = {
  getAllTags: (isSlowMode: boolean, slowModeTime: number): Promise<Tag[]> => {
    return resolveSlowPromiseWrapper(Tags, isSlowMode, slowModeTime);
  },

  createTag: (name: string, isSlowMode: boolean, slowModeTime: number): Promise<Tag[]> => {
    Tags.push({
      name,
      id: uuidv4(),
    });
    return resolveSlowPromiseWrapper(Tags, isSlowMode, slowModeTime);
  },

  deleteTag: (id: string, isSlowMode: boolean, slowModeTime: number): Promise<Tag[]> => {
    const idx = Tags.findIndex((tag) => tag.id === id);
    if (idx === -1) {
      throw rejectSlowPromiseWrapper(`No Tag item found with id ${id}`, isSlowMode, slowModeTime);
    }
    Tags.splice(idx, 1);
    return resolveSlowPromiseWrapper(Tags, isSlowMode, slowModeTime);
  },
};
