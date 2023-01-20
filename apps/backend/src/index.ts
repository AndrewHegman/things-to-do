import { ApolloServer } from "@apollo/server";
import { typeDefs } from "@ttd/graphql";
import { resolvers } from "./resolvers";
import dotenv from "dotenv";
import { connect, Mongoose, ConnectionStates, Connection } from "mongoose";
import express from "express";
import http from "http";
import cors from "cors";
import { json } from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { Categories, Tags, Things } from "./database";
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault,
} from "@apollo/server/plugin/landingPage/default";
import { ApolloServerPluginLandingPageDisabled } from "@apollo/server/plugin/disabled";

dotenv.config();

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  resolvers,
  typeDefs,
  csrfPrevention: true,
  plugins: [ApolloServerPluginLandingPageDisabled()],
});

connect(`mongodb+srv://admin:${process.env.DATABASE_PW}@inventory.fcghx.mongodb.net/ttd2`)
  .then(async () => {
    const { url } = await startStandaloneServer(server, {
      listen: { port: 3000 },
      context: async () => ({
        Categories,
        Tags,
        Things,
      }),
    });
    console.log(`🚀  Server ready at ${url}`);
  })
  .catch((e) => console.error(`Failed to connect to mongodb: ${e}`));

// const app = express();
// const httpServer = http.createServer(app);
// const server = new ApolloServer({
//   resolvers,
//   typeDefs,
//   plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
//   introspection: true,
// });

// server.start().then(() => {
//   app.use(
//     "/graphql",
//     cors<cors.CorsRequest>({ origin: true, allowedHeaders: "content-type" }),
//     json(),
//     expressMiddleware(server, {
//       context: async () => ({
//         Categories,
//         Tags,
//         Things,
//       }),
//     })
//   );

//   connect(`mongodb+srv://admin:${process.env.DATABASE_PW}@inventory.fcghx.mongodb.net/ttd2`)
//     .then(async () => {
//       await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
//       console.log(`🚀 Server ready`);
//     })
//     .catch((e) => console.error(`Failed to connect to mongodb: ${e}`));
// });

// let databaseConnection: Mongoose;

// const connectDatabase = async () => {
//   if (databaseConnection?.connection?.readyState !== ConnectionStates.connected) {
//     databaseConnection = await connect(`mongodb+srv://admin:${process.env.DATABASE_PW}@inventory.fcghx.mongodb.net/ttd2`);
//   }
// };

// const server = new ApolloServer({
//   resolvers,
//   typeDefs,
//   introspection: true,
// });

// server.startInBackgroundHandlingStartupErrorsByLoggingAndFailingAllRequests();

// const app = express();
// app.use(
//   cors(),
//   json(),
//   expressMiddleware(server, {
//     context: async ({ req, res }) => {
//       if (databaseConnection?.connection?.readyState !== ConnectionStates.connected) {
//         console.log("test");
//         databaseConnection = await connect(`mongodb+srv://admin:${process.env.DATABASE_PW}@inventory.fcghx.mongodb.net/ttd2`);
//       }
//       return {
//         Categories,
//         Tags,
//         Things,
//         lambdaContext: {
//           callbackWaitsForEmptyEventLoop: false,
//         },
//         callbackWaitsForEmptyEventLoop: false,
//       };
//     },
//   })
// );
// export default app;
