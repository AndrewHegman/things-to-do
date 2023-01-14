import * as queries from "./queries";
import * as mutations from "./mutations";

export const resolvers = {
  Query: {
    ...queries,
  },
  Mutation: {
    ...mutations,
  },
};
