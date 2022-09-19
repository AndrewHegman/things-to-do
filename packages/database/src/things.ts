import { connection } from "./conn";
import { Collection, Document, ObjectId } from "mongodb";
import { Collections } from "./collections";
import { Thing } from "@ttd/interfaces";

export class Things {
  private static instance: Things;
  private db: Collection<Document> | null;

  private constructor() {
    this.db = null;
  }

  static getInstance() {
    if (!Things.instance) {
      Things.instance = new Things();
    }
    return Things.instance;
  }

  async getDb(): Promise<Collection<Document>> {
    if (!this.db) {
      this.db = (await connection.getDb()).collection(Collections.Things);
    }
    return this.db;
  }

  async getAll(category?: ObjectId) {
    try {
      return (await this.getDb()).find(category ? { category } : {}).toArray();
    } catch (err) {
      console.error(`Error when fetching Things. ${err}`);
    }
  }

  async getById(_id: ObjectId) {
    try {
      return (await this.getDb()).findOne({ _id });
    } catch (err) {
      throw new Error(`Error when fetching Thing. ${err}`);
    }
  }

  async update(_id: ObjectId, updatedThing: Omit<Thing, "_id">) {
    try {
      await (await this.getDb()).findOneAndUpdate({ _id }, { $set: updatedThing }, { upsert: false });
      return this.getAll();
    } catch (err) {
      throw new Error(`Error when updating Thing. ${err}`);
    }
  }

  async create(thing: Omit<Thing, "_id">) {
    try {
      return (await this.getDb()).insertOne(thing);
    } catch (err) {
      throw new Error(`Error when creating new Thing. ${err}`);
    }
  }

  async delete(_id: ObjectId) {
    try {
      await (await this.getDb()).deleteOne({ _id });
      return (await this.getDb()).find({}).toArray();
    } catch (err) {
      throw new Error(`Error when deleting Thing. ${err}`);
    }
  }
}
