import { connection } from "./conn";
import { Collection, Document, ObjectId } from "mongodb";
import { Collections } from "./collections";
import dotenv from "dotenv";

dotenv.config({ path: `${process.cwd()}/../../.env` });

export abstract class QueryHandler {
  private db: Collection<Document> | null;
  private readonly type: Collections;
  private isDev = process.env.MODE === "develop";

  protected constructor(type: Collections) {
    this.db = null;
    this.type = type;
  }

  private async getDb(): Promise<Collection<Document>> {
    if (!this.db) {
      this.db = (await connection.getDb()).collection(this.type);
    }
    return this.db;
  }

  protected async fetch(pipeline: Document[], errorText: string) {
    try {
      return (await this.getDb()).aggregate([{ $match: { dev: this.isDev } }, ...pipeline]);
    } catch (err) {
      console.error(`${errorText}. ${err}`);
    }
  }

  protected async _update<T>(_id: string, updated: Omit<T, "_id">, errText: string) {
    try {
      await (
        await this.getDb()
      ).findOneAndUpdate({ _id: new ObjectId(_id) }, { $set: { ...updated, dev: this.isDev } }, { upsert: false });
    } catch (err) {
      throw new Error(`${errText}. ${err}`);
    }
  }

  protected async _create<T>(created: Omit<T, "_id">, errText: string) {
    try {
      return await (await this.getDb()).insertOne({ ...created, dev: this.isDev });
      // if (insertAttempt.acknowledged) {
      //   return this.fetch([{ $match: { _id: insertAttempt.insertedId } }], "Error when fetching created data");
      // }
    } catch (err) {
      throw new Error(`Error when creating new Thing. ${err}`);
    }
  }

  protected async _delete(_id: string, errText: string) {
    try {
      await (await this.getDb()).deleteOne({ _id: new ObjectId(_id), dev: this.isDev });
      return (await this.getDb()).find({}).toArray();
    } catch (err) {
      throw new Error(`${errText}. ${err}`);
    }
  }
}
