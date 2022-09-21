import { connection } from "./conn";
import { Collection, Document, ObjectId } from "mongodb";
import { Collections } from "./collections";
import { Thing } from "@ttd/interfaces";
import { CategoryLookup, ReplaceIdField, TagLookup, ThingLookup } from "./aggregations";

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

  async getAll(category?: string) {
    if (category) {
      throw new Error(`Error -- fetching Things by category has not been implemented!`);
    }

    try {
      return (await this.getDb()).aggregate([...ReplaceIdField, ...TagLookup(CategoryLookup()), ...CategoryLookup()]).toArray();
    } catch (err) {
      throw new Error(`Error when fetching Things. ${err}`);
    }
  }

  async getById(_id: string) {
    try {
      return (await this.getDb()).aggregate([{ $match: { _id: new ObjectId(_id) } }, ...CategoryLookup(), ...TagLookup()]).next();
    } catch (err) {
      throw new Error(`Error when fetching Thing. ${err}`);
    }
  }

  async update(_id: string, updatedThing: Omit<Thing, "_id">) {
    try {
      await (await this.getDb()).findOneAndUpdate({ _id }, { $set: updatedThing }, { upsert: false });
      return this.getAll();
    } catch (err) {
      throw new Error(`Error when updating Thing. ${err}`);
    }
  }

  async create(thing: Omit<Thing, "_id" | "tags" | "category"> & { tags: string[]; category: string }) {
    try {
      const insertAttempt = await (
        await this.getDb()
      ).insertOne({ ...thing, tags: thing.tags.map((tag) => new ObjectId(tag)), category: new ObjectId(thing.category) });
      if (insertAttempt.acknowledged) {
        return this.getById(insertAttempt.insertedId.toString());
      }
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
