import { connect } from "mongoose";
import { CategoryModel, TagModel, ThingModel } from "../models";
import { Data } from "./data";

export const hydrateDatabase = async () => {
  await connect("mongodb://localhost:27017/Things-To-Do");
  try {
    await TagModel.create(Data.Database.Tags);
    await CategoryModel.create(Data.Database.Categories);
    await ThingModel.create(Data.Database.Things);
  } catch (e) {
    throw new Error(`${e}`);
  }
};

export const tearDownDatabase = async () => {
  await TagModel.deleteMany({});
  await CategoryModel.deleteMany({});
  await ThingModel.deleteMany({});
};
