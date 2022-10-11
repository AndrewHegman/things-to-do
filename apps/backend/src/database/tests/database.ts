import { MongoMemoryServer } from "mongodb-memory-server";
import { MongoClient, Db } from "mongodb";
import { Collections } from "../collections";
import { Categories, Tags, Things } from "./data";

export const createDatabase = async () => {
  const mongo = await MongoMemoryServer.create();

  const mongoDBURL = mongo.getUri();
  const connection = await MongoClient.connect(mongoDBURL);

  //Seed Database
  const database = connection.db();
  await database.collection(Collections.Categories).insertMany(Categories);
  await database.collection(Collections.Tags).insertMany(Tags);
  await database.collection(Collections.Things).insertMany(Things);

  return { database, stop: mongo.stop };
};
