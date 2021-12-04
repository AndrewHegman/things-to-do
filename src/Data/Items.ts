import { ToDoItem } from "../Interface/ToDoItem";
import { NamedTags } from "./Tags";

export const items: ToDoItem[] = [
  {
    id: "0",
    name: "The Italian Job",
    tags: [NamedTags.action],
    categoryKey: "0",
  },
  {
    id: "1",
    name: "Casablanca",
    tags: [NamedTags.drama, NamedTags.romance, NamedTags.war],
    categoryKey: "0",
  },
  {
    id: "2",
    name: "Napoleon Dynamite",
    tags: [NamedTags.comedy],
    categoryKey: "0",
  },
  {
    id: "3",
    name: "Ristorante Roma",
    tags: [NamedTags.italian, NamedTags.carmel, NamedTags.takeParentsTo],
    categoryKey: "1",
  },
  {
    id: "4",
    name: "Italian House",
    tags: [NamedTags.westfield, NamedTags.italian],
    categoryKey: "1",
  },
  {
    id: "5",
    name: "Juniper",
    tags: [NamedTags.southern],
    categoryKey: "1",
  },
  {
    id: "6",
    name: "Bottleworks",
    tags: [NamedTags.cocktailBar],
    categoryKey: "1",
  },
  {
    id: "7",
    name: "Chilly Water",
    tags: [NamedTags.brewery, NamedTags.downtown],
    categoryKey: "1",
  },
  {
    id: "8",
    name: "Finger Lakes, NY",
    tags: [],
    categoryKey: "cities",
  },
];
