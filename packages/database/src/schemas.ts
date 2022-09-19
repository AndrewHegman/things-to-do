import { Category, Tag, Thing } from "@ttd/interfaces";
import { Schema } from "mongoose";

export const TagSchema = new Schema<Tag>({
  name: { type: String, required: true },
  id: { type: String, required: true },
});

export const ThingSchema = new Schema<Thing>({
  name: { type: String, required: true },
  id: { type: String, required: true },
  tags: { type: [TagSchema], required: true },
});

export const CategorySchema = new Schema<Category>({
  name: { type: String, required: true },
  id: { type: String, required: true },
  things: { type: [ThingSchema], required: true },
  tags: { type: [TagSchema], required: true },
});
