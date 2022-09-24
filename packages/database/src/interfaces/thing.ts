import { Thing } from "@ttd/interfaces";

export type CreateThingDAI = Omit<Thing, "_id" | "tags" | "category"> & { tags: string[]; category: string };

export type UpdateThingDAI = CreateThingDAI;
