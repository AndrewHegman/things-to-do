import { Document, ObjectId } from "mongodb";
import { CategoryModel } from "./models";
import { Category } from "@ttd/interfaces";
import { CategorySelect, PopulateThing, PopulateTag } from "./aggregations";

class Categories {
  private static instance: Categories;

  private constructor() {}

  public static getInstance() {
    if (!Categories.instance) {
      Categories.instance = new Categories();
    }
    return Categories.instance;
  }

  public async getAll() {
    return await CategoryModel.find({}, CategorySelect).populate(PopulateThing).populate(PopulateTag).lean();
  }

  public async getById(_id: string) {
    return await CategoryModel.findById(_id, CategorySelect).populate(PopulateTag).populate(PopulateThing).lean();
  }

  public async update(_id: string, updatedCategory: Omit<Category, "_id">) {
    await CategoryModel.updateOne({ _id: new ObjectId(_id) }, updatedCategory);
    return this.getAll();
  }

  public async create(category: Omit<Category, "_id">) {
    return await CategoryModel.create(category);
  }

  // async delete(_id: string) {
  //   return await this._delete(_id, "Error when deleting Category");
  //   //   try {
  //   //     await (await this.getDb()).deleteOne({ _id: new ObjectId(_id) });
  //   //     return (await this.getDb()).find({}).toArray();
  //   //   } catch (err) {
  //   //     throw new Error(`Error when deleting Category. ${err}`);
  //   //   }
  //   // }
  // }
}

export default Categories.getInstance();
