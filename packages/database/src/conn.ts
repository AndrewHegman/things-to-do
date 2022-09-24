import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";

console.log(__dirname);
dotenv.config({ path: `${process.cwd()}/../../.env` });

class Connection {
  private static instance: Connection;
  private dbConnection!: Db;

  static getInstance() {
    if (!Connection.instance) {
      Connection.instance = new Connection();
    }
    return Connection.instance;
  }

  async getDb() {
    if (!this.dbConnection) {
      try {
        const db = await MongoClient.connect(`mongodb+srv://admin:${process.env.DATABASE_PW}@inventory.fcghx.mongodb.net/test`);
        this.dbConnection = db.db("Things-To-Do");
        console.log("Successfully connected to MongoDB.");
      } catch (err) {
        throw new Error(`Error connecting to database: ${err}`);
      }
    }
    return this.dbConnection;
  }
}

export const connection = Connection.getInstance();
