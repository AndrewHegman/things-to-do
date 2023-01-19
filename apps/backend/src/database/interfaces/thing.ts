import { Thing } from "@ttd/graphql";
import { WithDev } from "./withDev";

export type CreateThingDAI = Omit<WithDev<Thing>, "_id" | "id" | "tags" | "category"> & { tags: string[]; category: string };

export type UpdateThingDAI = Partial<Omit<Thing, "_id" | "id">>;
