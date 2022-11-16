export const ThingSelect = { _id: 0, name: 1, tags: 1, description: 1, dev: 1, id: "$_id" };

export const CategorySelect = { _id: 0, name: 1, tags: 1, things: 1, dev: 1, id: "$_id" };

export const TagsSelect = { _id: 0, name: 1, dev: 1, id: "$_id" };

export const PopulateTag = { path: "tags", select: TagsSelect };

export const PopulateThing = { path: "things", select: ThingSelect, populate: PopulateTag };

export const PopulateTagShallow = { path: "tags", select: TagsSelect };
