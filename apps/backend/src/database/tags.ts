import { ObjectId } from "mongodb";
import { TagFields } from "./collections";
import { Tag } from "@ttd/interfaces";
import { PopulateCategory, TagsSelect } from "./aggregations";
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

  async getAll() {
    return await TagModel.find({}, TagsSelect).populate(PopulateCategory).lean();
  }

  async getById(_id: string) {
    return await TagModel.findById(_id, TagsSelect).populate(PopulateCategory).lean();
  }

  async getByCategoryId(_id: string) {
    return await TagModel.find({ [TagFields.Category]: new ObjectId(_id) }, TagsSelect)
      .populate(PopulateCategory)
      .lean();
  }

  async update(_id: string, updatedTag: Omit<Tag, "_id">) {
    return await TagModel.findOneAndUpdate({ _id: new ObjectId(_id) }, updatedTag, { lean: true, projection: TagsSelect })
      .populate(PopulateCategory)
      .lean();
  }

  async create(tag: Omit<Tag, "_id">) {
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
