import { queries } from "./queries";
import { mutations } from "./mutations";
import { Category, Resolvers } from "@ttd/graphql";
import { Categories } from "../database";

export const resolvers = {
  Query: {
    ...queries,
  },
  Mutation: {
    ...mutations,
  },
};
