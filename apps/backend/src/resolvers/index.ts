import { categories, category, tagsByCategory, tags, things } from "./queries";
import { createTag, createThing, createCategory, updateThing, deleteThing } from "./mutations";

export const resolvers = {
  Query: {
    categories,
    category,
    tagsByCategory,
    tags,
    things,
  },
  Mutation: {
    createTag,
    createThing,
    createCategory,
    updateThing,
    deleteThing,
  },
};
