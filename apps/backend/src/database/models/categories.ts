import { Category, WithDev } from "@ttd/interfaces";
import { model } from "mongoose";
import { CategorySchema } from "../schemas";

export const CategoryModel = model<WithDev<Category>>("categories", CategorySchema, "categories");
