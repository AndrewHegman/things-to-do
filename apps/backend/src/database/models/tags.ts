import { Tag } from "@ttd/graphql";
import { model } from "mongoose";
import { TagSchema } from "../schemas";
import { WithDev } from "../interfaces";

export const TagModel = model<Tag>("tags", TagSchema, "tags");
