import { connection } from "./conn";
import { Collection, Document, ObjectId } from "mongodb";
import { Collections, ThingFields, CategoryFields, TagFields } from "./collections";
import { Category } from "@ttd/interfaces";
import { getThingLookup } from "./utils";

export class Categories {
  private static instance: Categories;
  private db: Collection<Document> | null;

  private constructor() {
    this.db = null;
  }

  static getInstance() {
    if (!Categories.instance) {
      Categories.instance = new Categories();
    }
    return Categories.instance;
  }

  async getDb(): Promise<Collection<Document>> {
    if (!this.db) {
      this.db = (await connection.getDb()).collection(Collections.Categories);
    }
    return this.db;
  }

  async getAll() {
    try {
      return (await this.getDb())
        .aggregate([
          {
            $lookup: {
              from: Collections.Things,
              localField: CategoryFields.Things,
              foreignField: ThingFields.ID,
              as: CategoryFields.Things,
              pipeline: [
                {
                  $lookup: {
                    from: Collections.Tags,
                    localField: ThingFields.Tags,
                    foreignField: ThingFields.ID,
                    as: ThingFields.Tags,
                  },
                },
              ],
            },
          },
        ])
        .toArray();
    } catch (err) {
      console.error(`Error when fetching Categories. ${err}`);
    }
  }

  async getById(_id: string) {
    try {
      return (await this.getDb())
        .aggregate([
          { $match: { _id: new ObjectId(_id) } },
          {
            $lookup: {
              from: Collections.Things,
              localField: CategoryFields.Things,
              foreignField: ThingFields.ID,
              as: CategoryFields.Things,
              pipeline: [
                {
                  $lookup: {
                    from: Collections.Tags,
                    localField: ThingFields.Tags,
                    foreignField: ThingFields.ID,
                    as: ThingFields.Tags,
                  },
                },
              ],
            },
          },
        ])
        .next();
    } catch (err) {
      throw new Error(`Error when fetching Category. ${err}`);
    }
  }

  async update(_id: string, updatedCategory: Omit<Category, "_id">) {
    try {
      await (await this.getDb()).findOneAndUpdate({ _id: new ObjectId(_id) }, { $set: updatedCategory }, { upsert: false });
      return this.getAll();
    } catch (err) {
      throw new Error(`Error when updating Category. ${err}`);
    }
  }

  async create(thing: Omit<Category, "_id">) {
    try {
      return (await this.getDb()).insertOne(thing);
    } catch (err) {
      throw new Error(`Error when creating new Category. ${err}`);
    }
  }

  async delete(_id: string) {
    try {
      await (await this.getDb()).deleteOne({ _id: new ObjectId(_id) });
      return (await this.getDb()).find({}).toArray();
    } catch (err) {
      throw new Error(`Error when deleting Category. ${err}`);
    }
  }
}
