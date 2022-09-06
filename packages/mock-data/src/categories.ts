import { Category } from "@ttd/interfaces";
import { FatDans, Juniper, TheWineVault, Vida } from "./things";

export const Restaurants: Category = {
  id: "1a",
  name: "Restaurants",
  things: [Vida, Juniper, FatDans, TheWineVault],
};

export const Movies: Category = {
  id: "1b",
  name: "Movies",
  things: [],
};
