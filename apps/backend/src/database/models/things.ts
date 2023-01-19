import { Thing } from "@ttd/graphql";
import { model } from "mongoose";
import { WithDev } from "../interfaces";
import { ThingSchema } from "../schemas";

export const ThingModel = model<WithDev<Thing>>("things", ThingSchema, "things");
