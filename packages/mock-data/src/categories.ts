import { Category } from "@ttd/interfaces";
import { American, Carmel, ChicagoStyle, Expensive, SmallPlates, Southern, TakeParentsTo, Westfield, Wine } from "./tags";
import { FatDans, Juniper, TheWineVault, Vida } from "./things";

export const Restaurants: Category = {
  id: "1a",
  name: "Restaurants",
  things: [Vida, Juniper, FatDans, TheWineVault],
  tags: [American, Expensive, Carmel, Southern, TakeParentsTo, ChicagoStyle, SmallPlates, Westfield, Wine],
};

export const Movies: Category = {
  id: "1b",
  name: "Movies",
  things: [],
  tags: [],
};

export const allCategories = [Restaurants, Movies];
