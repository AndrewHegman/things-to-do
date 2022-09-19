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

export const ThingLookup = [
  ...ReplaceIdField,
  {
    $lookup: {
      from: Collections.Tags,
      localField: ThingFields.Tags,
      foreignField: TagFields.ID,
      as: ThingFields.Tags,
      pipeline: [...ReplaceIdField],
    },
  },
];

export const CategoryLookup = [
  // ...ReplaceIdField,
  {
    $lookup: {
      from: Collections.Things,
      localField: CategoryFields.Things,
      foreignField: ThingFields.ID,
      as: CategoryFields.Things,
      pipeline: [...ThingLookup],
    },
  },
];
