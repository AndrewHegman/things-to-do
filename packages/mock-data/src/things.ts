import { Thing } from "@ttd/interfaces";
import { American, Carmel, ChicagoStyle, Expensive, SmallPlates, Southern, TakeParentsTo, Westfield, Wine } from "./tags";

export const Vida: Thing = {
  name: "Vida",
  id: "1",
  tags: [American, Expensive],
  description: "Upscale restaurant",
  category: "1a",
};

export const Juniper: Thing = {
  name: "Juniper",
  id: "2b",
  tags: [American, Carmel, Southern, TakeParentsTo],
  description: "Southern food place",
  category: "1a",
};

export const FatDans: Thing = {
  name: "Fat Dans",
  id: "3b",
  tags: [American, Carmel, ChicagoStyle, TakeParentsTo],
  description: "Chicago style deli",
  category: "1a",
};

export const TheWineVault: Thing = {
  name: "The Wine Vault",
  id: "4b",
  tags: [SmallPlates, Westfield, Wine, TakeParentsTo],
  description: "Upscale wine bar",
  category: "1a",
};

export const allThings = [Vida, Juniper, FatDans, TheWineVault];
