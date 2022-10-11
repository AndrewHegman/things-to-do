import { Tag, WithDev } from "@ttd/interfaces";
import { model } from "mongoose";
import { TagSchema } from "../schemas";

export const TagModel = model<WithDev<Tag>>("tags", TagSchema, "tags");
