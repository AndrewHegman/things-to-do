import { Thing } from "@ttd/graphql";

export type CreateThingDAI = Omit<Thing, "_id" | "id" | "tags" | "category"> & { tags: string[]; category: string };

export type UpdateThingDAI = Partial<Omit<Thing, "_id" | "id" | "tags"> & { tags: string[] }>;
