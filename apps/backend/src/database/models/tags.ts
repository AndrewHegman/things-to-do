import { Tag } from "@ttd/graphql";
import { model } from "mongoose";
import { TagSchema } from "../schemas";
import { WithDev } from "../interfaces";

export const TagModel = model<WithDev<Tag>>("tags", TagSchema, "tags");
