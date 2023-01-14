import { Thing, WithDev } from "@ttd/interfaces";

export type CreateThingDAI = Omit<WithDev<Thing>, "_id" | "tags" | "category"> & { tags: string[]; category: string };

export type UpdateThingDAI = Partial<Omit<Thing, "_id">>;
