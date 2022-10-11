import { Thing } from "@ttd/interfaces";
import { American, Carmel, ChicagoStyle, Expensive, SmallPlates, Southern, TakeParentsTo, Westfield, Wine } from "./tags";

export const Vida: Thing = {
  name: "Vida",
  id: "1",
  tags: ["1c", "2c"],
  description: "Upscale restaurant",
  category: "1a",
};

export const Juniper: Thing = {
  name: "Juniper",
  id: "2b",
  tags: ["1c", "3c", "4c", "5c"],
  description: "Southern food place",
  category: "1a",
};

export const FatDans: Thing = {
  name: "Fat Dans",
  id: "3b",
  tags: ["1c", "3c", "6c", "5c"],
  description: "Chicago style deli",
  category: "1a",
};

export const TheWineVault: Thing = {
  name: "The Wine Vault",
  id: "4b",
  tags: ["7c", "8c", "9c", "5c"],
  description: "Upscale wine bar",
  category: "1a",
};

export const allThings = [Vida, Juniper, FatDans, TheWineVault];
