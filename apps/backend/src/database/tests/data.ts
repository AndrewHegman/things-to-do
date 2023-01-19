import { Category, Thing, Tag } from "@ttd/graphql";
import { ObjectId } from "mongodb";

const American: Tag = {
  id: new ObjectId("22222222222a").toString(),
  name: "American",
};

const Expensive: Tag = {
  id: new ObjectId("22222222222b").toString(),
  name: "Expensive",
};

const Carmel: Tag = {
  id: new ObjectId("22222222222c").toString(),
  name: "Carmel",
};

const Southern: Tag = {
  id: new ObjectId("22222222222d").toString(),
  name: "Southern",
};

const TakeParentsTo: Tag = {
  id: new ObjectId("22222222222e").toString(),
  name: "Take Parents To",
};

const ChicagoStyle: Tag = {
  id: new ObjectId("22222222222f").toString(),
  name: "Chicago-style",
};

const SmallPlates: Tag = {
  id: new ObjectId("22222222222g").toString(),
  name: "Small plates",
};

const Westfield: Tag = {
  id: new ObjectId("22222222222h").toString(),
  name: "Westfield",
};

const Wine: Tag = {
  id: new ObjectId("22222222222i").toString(),
  name: "Wine",
};

const Vida: Thing = {
  name: "Vida",
  id: new ObjectId("33333333333a").toString(),
  tags: [American, Expensive],
  description: "Upscale restaurant",
};

const Juniper: Thing = {
  name: "Juniper",
  id: new ObjectId("33333333333b").toString(),
  tags: [American, Carmel, Southern, TakeParentsTo],
  description: "Southern food place",
};

const FatDans: Thing = {
  name: "Fat Dans",
  id: new ObjectId("33333333333c").toString(),
  tags: [American, Carmel, ChicagoStyle, TakeParentsTo],
  description: "Chicago style deli",
};

const TheWineVault: Thing = {
  name: "The Wine Vault",
  id: new ObjectId("33333333333d").toString(),
  tags: [SmallPlates, Westfield, Wine, TakeParentsTo],
  description: "Upscale wine bar",
};

const Restaurants: Category = {
  id: new ObjectId("11111111111a").toString(),
  name: "Restaurants",
  tags: [American, Expensive, Carmel, Southern, TakeParentsTo, ChicagoStyle, SmallPlates, Westfield, Wine],
  things: [Vida, Juniper, FatDans, TheWineVault],
};

const Movies: Category = {
  id: new ObjectId("11111111111b").toString(),
  name: "Movies",
  tags: [],
  things: [],
};

const Things = [Vida, Juniper, FatDans, TheWineVault];

const Tags = [American, Expensive, Carmel, Southern, TakeParentsTo, ChicagoStyle, SmallPlates, Westfield, Wine];

const Categories = [Restaurants, Movies];

export const Data = {
  Database: {
    Categories: Categories.map((category) => ({ _id: category.id, ...category })),
    Tags: Tags.map((tag) => ({ _id: tag.id, ...tag })),
    Things: Things.map((thing) => ({ _id: thing.id, ...thing })),
  },
  Raw: {
    Things,
    Tags,
    Categories,
  },
  Expect: {
    Things,
    Tags,
    Categories,
  },
  // Expect: {
  //   Categories,
  //   Things: Things.map((thing) => ({
  //     ...thing,
  //     tags: thing.tags.map((tag) => {
  //       const hydratedTag = Tags.find((Tag) => Tag.id === tag);
  //       return { ...hydratedTag, category: Categories.find((Category) => hydratedTag?.category === Category.id) };
  //     }),
  //     category: Categories.find((Category) => Category.id === thing.category),
  //   })),
  //   Tags: Tags.map((tag) => ({
  //     ...tag,
  //     category: Categories.find((Category) => Category.id === tag.category),
  //   })),
  // },
};
