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
    console.log(await ThingModel.find({}, ThingSelect).populate(PopulateCategory).populate(PopulateTag).lean());
    return await ThingModel.find({}, ThingSelect).populate(PopulateCategory).populate(PopulateTag).lean();
  }

  async getById(_id: string) {
    return await ThingModel.findById(_id, ThingSelect).populate(PopulateCategory).populate(PopulateTag).lean();
  }

  async update(_id: string, updatedThing: UpdateThingDAI) {
    return await ThingModel.findOneAndUpdate({ _id: new ObjectId(_id) }, updatedThing, {
      lean: true,
      projection: [PopulateTag, PopulateCategory],
    })
      .populate(PopulateCategory)
      .lean();
    // try {
    //   const updateAttempt = await (
    //     await this.getDb()
    //   ).findOneAndUpdate(
    //     { _id: new ObjectId(_id) },
    //     {
    //       $set: {
    //         ...updatedThing,
    //         tags: updatedThing.tags.map((tag) => new ObjectId(tag)),
    //         category: new ObjectId(updatedThing.category),
    //       },
    //     },
    //     { upsert: false }
    //   );

    //   if (updateAttempt.ok) {
    //     return this.getById(_id);
    //   }
    //   throw updateAttempt.lastErrorObject;
    // } catch (err) {
    //   throw new Error(`Error when updating Thing. ${err}`);
    // }
  }

  async create(thing: CreateThingDAI) {
    const insertedAttempt = await ThingModel.create(thing);
    if (insertedAttempt.id) {
      return await this.getById(insertedAttempt.id);
    }
    // try {
    //   const insertAttempt = await (
    //     await this.getDb()
    //   ).insertOne({ ...thing, tags: thing.tags.map((tag) => new ObjectId(tag)), category: new ObjectId(thing.category) });
    //   if (insertAttempt.acknowledged) {
    //     return this.getById(insertAttempt.insertedId.toString());
    //   }
    // } catch (err) {
    //   throw new Error(`Error when creating new Thing. ${err}`);
    // }
  }

  async delete(_id: ObjectId) {
    return await ThingModel.deleteOne({ _id: new ObjectId(_id) });

    // try {
    //   await (await this.getDb()).deleteOne({ _id });
    //   return (await this.getDb()).find({}).toArray();
    // } catch (err) {
    //   throw new Error(`Error when deleting Thing. ${err}`);
    // }
  }
}

export default Things.getInstance();
