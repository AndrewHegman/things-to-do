import { Resolvers } from "@ttd/graphql";
import { Context } from "../../database/interfaces";

export const things: Resolvers<Context>["Mutation"] = {
  // TODO: Get rid of the non-null assertion
  createThing: async (parent, args, { Things }) => (await Things.create(args))!,

  // TODO: Get rid of the 'as any'
  updateThing: async (parent, args, { Things }) => {
    const { id, ...updatedThing } = args;
    const foo = (await Things.update(id, updatedThing as any))!;
    console.log(foo);
    return foo;
  },
  deleteThing: async (parent, args, { Things }) => (await Things.delete(args.id)) || "",
};
