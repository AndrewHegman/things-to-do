import { ObjectId } from "mongodb";
import { PopulateTag, ThingSelect } from "./aggregations";
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

  async getAll(dev: boolean) {
    return await ThingModel.find({ dev }, ThingSelect).populate(PopulateTag).lean();
  }

  async getByCategory(category: string) {
    return await ThingModel.find({ category }, ThingSelect).populate(PopulateTag).lean();
  }

  async getById(_id: string) {
    return await ThingModel.findById(_id, ThingSelect).populate(PopulateTag).lean();
  }

  async update(_id: string, updatedThing: UpdateThingDAI) {
    const oldThing = await this.getById(_id);
    return await ThingModel.findByIdAndUpdate(_id, { ...updatedThing, ...oldThing })
      .populate(PopulateTag)
      .lean();
  }

  async create(thing: CreateThingDAI) {
    const insertedAttempt = await ThingModel.create(thing);
    if (insertedAttempt.id) {
      return await this.getById(insertedAttempt.id);
    }
  }

  async delete(_id: string) {
    const deleteAttempt = await ThingModel.deleteOne({ _id: new ObjectId(_id) });
    if (deleteAttempt.acknowledged) {
      return _id;
    }
  }
}

export default Things.getInstance();
