import { Collections, ThingFields } from "./collections";

export const getThingLookup = (localField: string) => {
  return {
    $lookup: {
      from: Collections.Things,
      localField,
      foreignField: ThingFields.ID,
      as: "test",
    },
  };
};
