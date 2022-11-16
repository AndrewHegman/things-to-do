import { Schema } from "mongoose";
import { mongooseLeanVirtuals } from "mongoose-lean-virtuals";

const ThingSchema = new Schema({
  name: String,
  tags: [{ type: Schema.Types.ObjectId, ref: "tags" }],
  dev: Boolean,
  description: String,
});

ThingSchema.virtual("id").get(function () {
  return this._id;
});

ThingSchema.plugin(mongooseLeanVirtuals);

export { ThingSchema };
