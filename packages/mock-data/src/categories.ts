import { Category } from "@ttd/interfaces";
import { American, Carmel, ChicagoStyle, Expensive, SmallPlates, Southern, TakeParentsTo, Westfield, Wine } from "./tags";

export const Restaurants: Category = {
  id: "1a",
  name: "Restaurants",
};

export const Movies: Category = {
  id: "1b",
  name: "Movies",
};

export const allCategories = [Restaurants, Movies];
