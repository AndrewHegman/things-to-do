import { Tags as tagsData } from "../Data/Tags";
import { Tag } from "../Interface/Tags";
import { resolveSlowPromiseWrapper, rejectSlowPromiseWrapper } from "./common";

export const tags = {
  getTagById: async (tagId: string, slowModeTime: number) => {
    return resolveSlowPromiseWrapper(
      tagsData.find((tag) => tag.id === tagId),

      slowModeTime
    );
  },

  getTags: async (slowModeTime: number) => {
    return resolveSlowPromiseWrapper(tagsData, slowModeTime);
  },

  getTagsByCategory: async (categoryId: string, slowModeTime: number) => {
    return resolveSlowPromiseWrapper(
      tagsData.filter((tag) => tag.category === categoryId),

      slowModeTime
    );
  },

  createTag: async (newTag: Omit<Tag, "id">, slowModeTime: number) => {
    if (newTag.name === "") {
      return rejectSlowPromiseWrapper(`Tags must have a valid name`, slowModeTime);
    }
    if (tagsData.find((tag) => tag.name === newTag.name)) {
      return rejectSlowPromiseWrapper(`A tag named ${newTag.name} already exists!`, slowModeTime);
    }
    const id = `${tagsData.length}`;
    const _newTag = { ...newTag, id };
    tagsData.push(_newTag);
    return resolveSlowPromiseWrapper(id, slowModeTime);
  },

  updateTag: async (tagId: string, updated: Partial<Omit<Tag, "id">>, slowModeTime: number) => {
    const tagToChange = tagsData.find((tag) => tag.id === tagId);
    if (!tagToChange) {
      return rejectSlowPromiseWrapper(`No tag found with id ${tagId}`, slowModeTime);
    }

    if (updated.name) {
      tagToChange.name = updated.name;
    }

    return resolveSlowPromiseWrapper(tagsData, slowModeTime);
  },

  deleteTag: async (tagId: string, slowModeTime: number) => {
    const tagIdx = tagsData.findIndex((tag) => tag.id === tagId);
    if (tagIdx === -1) {
      return rejectSlowPromiseWrapper(`No category found with id ${tagId}`, slowModeTime);
    }
    tagsData.splice(tagIdx, 1);

    return resolveSlowPromiseWrapper(tagsData, slowModeTime);
  },
};
