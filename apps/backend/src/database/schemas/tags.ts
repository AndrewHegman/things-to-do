import { Tag, WithDev } from "@ttd/interfaces";
import { Schema } from "mongoose";
import { mongooseLeanVirtuals } from "mongoose-lean-virtuals";

const TagSchema = new Schema({
  name: String,
  category: { type: Schema.Types.ObjectId, ref: "categories" },
  dev: Boolean,
});

TagSchema.virtual("id").get(function () {
  return this._id;
});

TagSchema.plugin(mongooseLeanVirtuals);

export { TagSchema };
