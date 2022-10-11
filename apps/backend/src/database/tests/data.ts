import { Category, Thing, Tag } from "@ttd/interfaces";
import { ObjectId } from "mongodb";

const Restaurants: Category = {
  id: new ObjectId("11111111111a").toString(),
  name: "Restaurants",
};

const Movies: Category = {
  id: new ObjectId("11111111111b").toString(),
  name: "Movies",
};

const American: Tag = {
  id: new ObjectId("22222222222a").toString(),
  name: "American",
  category: Restaurants.id,
};
const Expensive: Tag = {
  id: new ObjectId("22222222222b").toString(),
  name: "Expensive",
  category: Restaurants.id,
};
const Carmel: Tag = {
  id: new ObjectId("22222222222c").toString(),
  category: Restaurants.id,
  name: "Carmel",
};
const Southern: Tag = {
  id: new ObjectId("22222222222d").toString(),
  category: Restaurants.id,
  name: "Southern",
};
const TakeParentsTo: Tag = {
  id: new ObjectId("22222222222e").toString(),
  category: Restaurants.id,
  name: "Take Parents To",
};
const ChicagoStyle: Tag = {
  id: new ObjectId("22222222222f").toString(),
  category: Restaurants.id,
  name: "Chicago-style",
};
const SmallPlates: Tag = {
  id: new ObjectId("22222222222g").toString(),
  category: Restaurants.id,
  name: "Small plates",
};
const Westfield: Tag = {
  id: new ObjectId("22222222222h").toString(),
  category: Restaurants.id,
  name: "Westfield",
};
const Wine: Tag = {
  id: new ObjectId("22222222222i").toString(),
  category: Restaurants.id,
  name: "Wine",
};

const Vida: Thing = {
  name: "Vida",
  id: new ObjectId("33333333333a").toString(),
  tags: [American.id, Expensive.id],
  description: "Upscale restaurant",
  category: Restaurants.id,
};

const Juniper: Thing = {
  name: "Juniper",
  id: new ObjectId("33333333333b").toString(),
  tags: [American.id, Carmel.id, Southern.id, TakeParentsTo.id],
  description: "Southern food place",
  category: Restaurants.id,
};

const FatDans: Thing = {
  name: "Fat Dans",
  id: new ObjectId("33333333333c").toString(),
  tags: [American.id, Carmel.id, ChicagoStyle.id, TakeParentsTo.id],
  description: "Chicago style deli",
  category: Restaurants.id,
};

const TheWineVault: Thing = {
  name: "The Wine Vault",
  id: new ObjectId("33333333333d").toString(),
  tags: [SmallPlates.id, Westfield.id, Wine.id, TakeParentsTo.id],
  description: "Upscale wine bar",
  category: Restaurants.id,
};

export const Things = [Vida, Juniper, FatDans, TheWineVault];

export const Tags = [American, Expensive, Carmel, Southern, TakeParentsTo, ChicagoStyle, SmallPlates, Westfield, Wine];

export const Categories = [Restaurants, Movies];
