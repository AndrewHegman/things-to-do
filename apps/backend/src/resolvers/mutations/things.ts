import { Resolvers } from "@ttd/graphql";

export const things: Resolvers["Mutation"] = {
  // TODO: Get rid of the non-null assertion
  createThing: async (parent, args, { Things }) => (await Things.create(args as any))!,
  updateThing: async (parent, args, { Things }) => {
    const { id, ...updatedThing } = args;
    return (await Things.update(id, updatedThing as any))!;
  },
  deleteThing: async (parent, args, { Things }) => (await Things.delete(args as any)) || "",
};
