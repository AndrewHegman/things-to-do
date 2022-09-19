import { connection } from "./conn";
import { Collection, Document, ObjectId } from "mongodb";
import { Collections } from "./collections";
import { Category, Tag } from "@ttd/interfaces";

export class Tags {
  private static instance: Tags;
  private db: Collection<Document> | null;

  private constructor() {
    this.db = null;
  }

  static getInstance() {
    if (!Tags.instance) {
      Tags.instance = new Tags();
    }
    return Tags.instance;
  }

  async getDb(): Promise<Collection<Document>> {
    if (!this.db) {
      this.db = (await connection.getDb()).collection(Collections.Tags);
    }
    return this.db;
  }

  async getAll() {
    try {
      return (await this.getDb()).find({}).toArray();
    } catch (err) {
      console.error(`Error when fetching Tags. ${err}`);
    }
  }

  async getById(_id: ObjectId) {
    try {
      return (await this.getDb()).findOne({ _id });
    } catch (err) {
      throw new Error(`Error when fetching Tag. ${err}`);
    }
  }

  async update(_id: ObjectId, updatedTag: Omit<Tag, "_id">) {
    try {
      await (await this.getDb()).findOneAndUpdate({ _id }, { $set: updatedTag }, { upsert: false });
      return this.getAll();
    } catch (err) {
      throw new Error(`Error when updating Tag. ${err}`);
    }
  }

  async create(tag: Omit<Tag, "_id">) {
    try {
      return (await this.getDb()).insertOne(tag);
    } catch (err) {
      throw new Error(`Error when creating new Tag. ${err}`);
    }
  }

  async delete(_id: ObjectId) {
    try {
      await (await this.getDb()).deleteOne({ _id });
      return (await this.getDb()).find({}).toArray();
    } catch (err) {
      throw new Error(`Error when deleting Tag. ${err}`);
    }
  }
}
