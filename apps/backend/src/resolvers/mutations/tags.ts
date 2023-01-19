import { Resolvers } from "@ttd/graphql";

export const tags: Resolvers["Mutation"] = {
  // TODO: Get rid of the non-null assertion
  createTag: async (parent, args, { Tags }) => (await Tags.create(args))!,
};
