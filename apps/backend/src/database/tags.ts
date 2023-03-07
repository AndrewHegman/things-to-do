import { ObjectId } from "mongodb";
import { TagFields } from "./collections";
import { Tag } from "@ttd/graphql";
import { TagsSelect } from "./aggregations";
import { TagModel } from "./models";

export class Tags {
  private static instance: Tags;

  private constructor() {}

  static getInstance() {
    if (!Tags.instance) {
      Tags.instance = new Tags();
    }
    return Tags.instance;
  }

  async getAll(dev: boolean) {
    return await TagModel.find({ dev }, TagsSelect).lean();
  }

  async getById(_id: string) {
    return await TagModel.findById(_id, TagsSelect).lean();
  }

  async getByCategoryId(_id: string) {
    return await TagModel.find({ [TagFields.Category]: new ObjectId(_id) }, TagsSelect).lean();
  }

  async update(_id: string, updatedTag: Omit<Tag, "_id" | "id">) {
    return await TagModel.findOneAndUpdate({ _id: new ObjectId(_id) }, updatedTag, { lean: true, projection: TagsSelect }).lean();
  }

  async create(tag: Omit<Tag, "_id" | "id">) {
    const insertedAttempt = await TagModel.create(tag);
    if (insertedAttempt.id) {
      return await this.getById(insertedAttempt.id);
    }
  }

  async delete(_id: string) {
    return await TagModel.deleteOne({ _id: new ObjectId(_id) });
  }
}

export default Tags.getInstance();
