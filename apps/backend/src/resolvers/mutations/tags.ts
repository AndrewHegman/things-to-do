import { Resolvers } from "@ttd/graphql";
import { Context } from "../../database/interfaces";

export const tags: Resolvers<Context>["Mutation"] = {
  // TODO: Get rid of the non-null assertion
  createTag: async (parent, args, { Tags }) => (await Tags.create(args))!,
};
