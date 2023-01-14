// import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "@ttd/graphql";
import { resolvers } from "./resolvers";
import dotenv from "dotenv";
import { connect } from "mongoose";
import express from "express";
import http from "http";
import cors from "cors";
import { json } from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";

dotenv.config({ path: `${process.cwd()}/../../.env` });

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  resolvers,
  typeDefs,
});
server.start().then(() => {
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  connect(`mongodb+srv://admin:${process.env.DATABASE_PW}@inventory.fcghx.mongodb.net/ttd2`)
    .then(async () => {
      await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
      console.log(`🚀 Server ready`);
    })
    .catch((e) => console.error(`Failed to connect to mongodb: ${e}`));
});
