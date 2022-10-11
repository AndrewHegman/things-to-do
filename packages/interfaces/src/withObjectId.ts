import { Thing } from "./thing";
import { Schema } from "mongoose";

export type WithObjectId<T> = {
  _id: Schema.Types.ObjectId;
} & Omit<T, "_id">;
