// import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
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
});

connect(`mongodb+srv://admin:${process.env.DATABASE_PW}@inventory.fcghx.mongodb.net/ttd2`)
  .then(() => {
    startStandaloneServer(server, {
      // listen: { port: 4000 },
    });
  })
  .catch((e) => console.error(`Failed to connect to mongodb: ${e}`));
