import { Category, WithDev } from "@ttd/interfaces";
import { Schema } from "mongoose";
import { mongooseLeanVirtuals } from "mongoose-lean-virtuals";

const CategorySchema = new Schema<WithDev<Category>>({
  name: String,
  dev: Boolean,
});

CategorySchema.virtual("id").get(function () {
  return this._id;
});

CategorySchema.plugin(mongooseLeanVirtuals);

export { CategorySchema };
