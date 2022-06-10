import { ToDoItem } from "../Interface/ToDoItem";
import { NamedTags } from "./Tags";

export const items: ToDoItem[] = [
  {
    _id: "0",
    name: "The Italian Job",
    tags: [NamedTags.action],
    category: "0",
  },
  {
    _id: "1",
    name: "Casablanca",
    tags: [NamedTags.drama, NamedTags.romance, NamedTags.war],
    category: "0",
  },
  {
    _id: "2",
    name: "Napoleon Dynamite",
    tags: [NamedTags.comedy],
    category: "0",
  },
  {
    _id: "3",
    name: "Ristorante Roma",
    tags: [NamedTags.italian, NamedTags.carmel, NamedTags.takeParentsTo],
    category: "1",
  },
  {
    _id: "4",
    name: "Italian House",
    tags: [NamedTags.westfield, NamedTags.italian],
    category: "1",
  },
  {
    _id: "5",
    name: "Juniper",
    tags: [NamedTags.southern],
    category: "1",
  },
  {
    _id: "6",
    name: "Bottleworks",
    tags: [NamedTags.cocktailBar],
    category: "1",
  },
  {
    _id: "7",
    name: "Chilly Water",
    tags: [NamedTags.brewery, NamedTags.downtown],
    category: "1",
  },
  {
    _id: "8",
    name: "Finger Lakes, NY",
    tags: [],
    category: "cities",
  },
];
