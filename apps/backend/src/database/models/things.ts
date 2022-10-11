import { Thing, WithDev } from "@ttd/interfaces";
import { model } from "mongoose";
import { ThingSchema } from "../schemas";

export const ThingModel = model<WithDev<Thing>>("things", ThingSchema, "things");
