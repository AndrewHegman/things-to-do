import { Document, ObjectId } from "mongodb";
import { CategoryModel } from "./models";
import { Category } from "@ttd/graphql";
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

  public async getAll(dev: boolean) {
    return await CategoryModel.find({ dev }, CategorySelect).populate(PopulateThing).populate(PopulateTag).lean();
  }

  public async getById(_id: string) {
    return await CategoryModel.findById(_id, CategorySelect).populate(PopulateTag).populate(PopulateThing).lean();
  }

  public async update(_id: string, updatedCategory: Partial<Omit<Category, "_id">>) {
    const oldCategory = this.getById(_id);
    await CategoryModel.updateOne({ _id: new ObjectId(_id) }, { ...oldCategory, ...updatedCategory });
    return this.getById(_id);
  }

  public async create(name: string, dev: boolean) {
    return await CategoryModel.create({ name, dev, tags: [], things: [] });
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
