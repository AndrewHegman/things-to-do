export const ThingSelect = { _id: 0, name: 1, tags: 1, description: 1, category: 1, dev: 1, id: "$_id" };

export const CategorySelect = { _id: 0, name: 1, dev: 1, id: "$_id" };

export const TagsSelect = { _id: 0, name: 1, category: 1, dev: 1, id: "$_id" };

export const PopulateCategory = { path: "category", select: CategorySelect };

export const PopulateTag = { path: "tags", select: TagsSelect, populate: PopulateCategory };

export const PopulateTagShallow = { path: "tags", select: TagsSelect };
