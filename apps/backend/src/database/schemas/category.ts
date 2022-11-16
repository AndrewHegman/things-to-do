import { Schema } from "mongoose";
import { mongooseLeanVirtuals } from "mongoose-lean-virtuals";

const CategorySchema = new Schema({
  name: String,
  tags: [{ type: Schema.Types.ObjectId, ref: "tags" }],
  things: [{ type: Schema.Types.ObjectId, ref: "things" }],
  dev: Boolean,
});

CategorySchema.virtual("id").get(function () {
  return this._id;
});

CategorySchema.plugin(mongooseLeanVirtuals);

export { CategorySchema };
