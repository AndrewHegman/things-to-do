import { ApolloServer } from "@apollo/server";
import { typeDefs } from "@ttd/graphql";
import { resolvers } from "./resolvers";
import dotenv from "dotenv";
import { connect } from "mongoose";
import express from "express";
import http from "http";
import cors from "cors";
import { json } from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { Categories, Tags, Things } from "./database";

import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), "..", "..", ".env") });

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  resolvers,
  typeDefs,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), ApolloServerPluginLandingPageDisabled()],
  introspection: true,
});

server.start().then(() => {
  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({
        Categories,
        Tags,
        Things,
        token: req.headers.token,
      }),
    })
  );

  connect(`mongodb+srv://admin:${process.env.DATABASE_PW}@inventory.fcghx.mongodb.net/ttd2`)
    .then(async () => {
      const port = process.env.PORT || 4000;
      await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
      console.log(`🚀 Server ready at port ${port}`);
    })
    .catch((e) => console.error(`Failed to connect to mongodb: ${e}`));
});
