import { Document, ObjectId } from "mongodb";
import { Collections } from "./collections";
import { Category } from "@ttd/interfaces";
import { ReplaceIdField, ThingLookup } from "./aggregations";
import { QueryHandler } from "./base";

export class Categories extends QueryHandler {
  private readonly categoryQuery: Document[] = [...ReplaceIdField, ...ThingLookup()];

  private static instance: Categories;

  private constructor() {
    super(Collections.Categories);
  }

  static getInstance() {
    if (!Categories.instance) {
      Categories.instance = new Categories();
    }
    return Categories.instance;
  }

  async getAll() {
    return (await this.fetch(this.categoryQuery, "Error when fetching categories"))?.toArray();
    // try {
    //   return (await this.getDb()).aggregate(this.categoryQuery).toArray();
    // } catch (err) {
    //   console.error(`Error when fetching Categories. ${err}`);
    // }
  }

  async getById(_id: string) {
    return (
      await this.fetch([{ $match: { _id: new ObjectId(_id) } }, ...this.categoryQuery], "Error when fetching Categories")
    )?.next();
    // return await this.fetch([{ $match: { _id: new ObjectId(_id) } }, ...this.categoryQuery], "Error when fetching Categories");

    // try {
    //   return (await this.getDb()).aggregate([{ $match: { _id: new ObjectId(_id) } }, ...this.categoryQuery]).next();
    // } catch (err) {
    //   throw new Error(`Error when fetching Category. ${err}`);
    // }
  }

  async update(_id: string, updatedCategory: Omit<Category, "_id">) {
    await this._update<Category>(_id, updatedCategory, "Error when updating Category");
    return this.getAll();
    // try {
    //   await (await this.getDb()).findOneAndUpdate({ _id: new ObjectId(_id) }, { $set: updatedCategory }, { upsert: false });
    //   return this.getAll();
    // } catch (err) {
    //   throw new Error(`Error when updating Category. ${err}`);
    // }
  }

  async create(thing: Omit<Category, "_id">) {
    const insertAttempt = await this._create(thing, "Error when creating new Category");
    if (insertAttempt.acknowledged) {
      return await this.getById(insertAttempt.insertedId.toString());
    }
    // try {
    //   return (await this.getDb()).insertOne(thing);
    // } catch (err) {
    //   throw new Error(`Error when creating new Category. ${err}`);
    // }
  }

  async delete(_id: string) {
    return await this._delete(_id, "Error when deleting Category");
    //   try {
    //     await (await this.getDb()).deleteOne({ _id: new ObjectId(_id) });
    //     return (await this.getDb()).find({}).toArray();
    //   } catch (err) {
    //     throw new Error(`Error when deleting Category. ${err}`);
    //   }
    // }
  }
}
