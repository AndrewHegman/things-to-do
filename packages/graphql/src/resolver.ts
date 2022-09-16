import { Tag } from "@ttd/interfaces";
import { Movies, Restaurants } from "@ttd/mock-data";

const mapTagsToCategory = (categoryId: string | undefined) => {
  return categoryId
    ? [Restaurants, Movies]
        .find((category) => category.id === categoryId)
        ?.things.map((thing) => thing.tags)
        .reduce((arr, tags) => {
          tags.forEach((tag) => !arr.find((_tag) => _tag.id === tag.id) && arr.push(tag));
          return arr;
        }, []) || []
    : [];
};

export const resolvers = {
  Query: {
    categories: () => {
      return [Restaurants, Movies].map((category) => ({ ...category, tags: mapTagsToCategory(category.id) }));
    },
    category: (_: any, args: any) =>
      mapTagsToCategory([Restaurants, Movies].find((category) => category.id === args.categoryId)?.id),
    // tagsByCategory: (_: any, args: any): Tag[] =>
    //   [Restaurants, Movies]
    //     .find((category) => category.id === args.categoryId)
    //     ?.things.map((thing) => thing.tags)
    //     .reduce((arr, tags) => {
    //       tags.forEach((tag) => !arr.find((_tag) => _tag.id === tag.id) && arr.push(tag));
    //       return arr;
    //     }, []) || [],
  },
};

/*
     return [Restaurants, Movies].reduce(
        (a, v) => ({
          ...a,
          [v.id]: v.things
            .map((thing) => thing.tags)
            .reduce((arr, tags) => {
              tags.forEach((tag) => !arr.find((_tag) => _tag.id === tag.id) && arr.push(tag));
              return arr;
            }, []),
        }),
        {}
      ); */
