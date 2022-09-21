import { Document } from "mongodb";
import { CategoryFields, Collections, TagFields, ThingFields } from "./collections";

export const ReplaceIdField = [
  {
    $addFields: {
      id: "$_id",
    },
  },
  {
    $project: {
      _id: 0,
    },
  },
];

export const TagLookup = (extraPipelines: Document[] = []) => [
  {
    $lookup: {
      from: Collections.Tags,
      localField: ThingFields.Tags,
      foreignField: TagFields.ID,
      as: ThingFields.Tags,
      pipeline: [...ReplaceIdField, ...extraPipelines],
    },
  },
];

export const ThingLookup = (extraPipelines: Document[] = []) => [
  {
    $lookup: {
      from: Collections.Things,
      localField: CategoryFields.Things,
      foreignField: ThingFields.ID,
      as: CategoryFields.Things,
      pipeline: [...TagLookup(), ...extraPipelines],
    },
  },
];

export const CategoryLookup = (extraPipelines: Document[] = []) => [
  {
    $lookup: {
      from: Collections.Categories,
      localField: "category",
      foreignField: CategoryFields.ID,
      as: "category",
      pipeline: [...ReplaceIdField, ...extraPipelines],
    },
  },
  { $unwind: "$category" },
];
