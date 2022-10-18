import { ObjectId } from "mongodb";
import { PopulateCategory, PopulateTag, ThingSelect } from "./aggregations";
import { UpdateThingDAI, CreateThingDAI } from "./interfaces";
import { ThingModel } from "./models";

class Things {
  private static instance: Things;

  private constructor() {}

  static getInstance() {
    if (!Things.instance) {
      Things.instance = new Things();
    }
    return Things.instance;
  }

  async getAll(category?: string) {
    if (category) {
      throw new Error(`Error -- fetching Things by category has not been implemented!`);
    }
    return await ThingModel.find({}, ThingSelect).populate(PopulateCategory).populate(PopulateTag).lean();
  }

  async getById(_id: string) {
    return await ThingModel.findById(_id, ThingSelect).populate(PopulateCategory).populate(PopulateTag).lean();
  }

  async update(_id: string, updatedThing: UpdateThingDAI) {
    return await ThingModel.findByIdAndUpdate(_id, updatedThing, { projection: ThingSelect, returnDocument: "after" })
      .populate(PopulateCategory)
      .populate(PopulateTag)
      .lean();
  }

  async create(thing: CreateThingDAI) {
    const insertedAttempt = await ThingModel.create(thing);
    if (insertedAttempt.id) {
      return await this.getById(insertedAttempt.id);
    }
  }

  async delete(_id: ObjectId) {
    const deleteAttempt = await ThingModel.deleteOne({ _id: new ObjectId(_id) });
    console.log(deleteAttempt);
    if (deleteAttempt.acknowledged) {
      return _id;
    }
  }
}

export default Things.getInstance();
