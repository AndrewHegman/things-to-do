import { Category } from "@ttd/graphql";
import { model } from "mongoose";
import { WithDev } from "../interfaces";
import { CategorySchema } from "../schemas";

export const CategoryModel = model<WithDev<Category>>("categories", CategorySchema, "categories");
