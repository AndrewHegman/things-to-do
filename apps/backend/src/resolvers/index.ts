import { categories, category, tagsByCategory, tags, things, thingsByCategory, thingsByCategories } from "./queries";
import { createTag, createThing, createCategory, updateThing, deleteThing } from "./mutations";

export const resolvers = {
  Query: {
    categories,
    category,
    tagsByCategory,
    tags,
    things,
    thingsByCategory,
    thingsByCategories,
  },
  Mutation: {
    createTag,
    createThing,
    createCategory,
    updateThing,
    deleteThing,
  },
};
