import { Tag, WithDev } from "@ttd/interfaces";
import { Schema } from "mongoose";
import { mongooseLeanVirtuals } from "mongoose-lean-virtuals";

const TagSchema = new Schema({
  name: String,
  dev: Boolean,
});

TagSchema.virtual("id").get(function () {
  return this._id;
});

TagSchema.plugin(mongooseLeanVirtuals);

export { TagSchema };
