import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { ApolloServer } from "apollo-server";
import { typeDefs } from "@ttd/graphql";
import { resolvers } from "./resolvers";
import dotenv from "dotenv";
import { connect } from "mongoose";

dotenv.config({ path: `${process.cwd()}/../../.env` });

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  resolvers,
  typeDefs,
  csrfPrevention: true,
  cache: "bounded",
  context: {},
  /**
   * What's up with this embed: true option?
   * These are our recommended settings for using AS;
   * they aren't the defaults in AS3 for backwards-compatibility reasons but
   * will be the defaults in AS4. For production environments, use
   * ApolloServerPluginLandingPageProductionDefault instead.
   **/
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
});

connect(`mongodb+srv://admin:${process.env.DATABASE_PW}@inventory.fcghx.mongodb.net/Things-To-Do`)
  .then(() => {
    // The `listen` method launches a web server.
    server.listen().then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  })
  .catch((e) => console.error(`Failed to connect to mongodb: ${e}`));
