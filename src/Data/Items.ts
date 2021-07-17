import { ToDoItem } from "../Interface/ToDoItem";
import { Tags } from "./Tags";

export const items: ToDoItem[] = [
  {
    id: "0",
    name: "The Italian Job",
    tags: [Tags.action],
    categoryKey: "0",
  },
  {
    id: "1",
    name: "Casablanca",
    tags: [Tags.drama, Tags.romance, Tags.war],
    categoryKey: "0",
  },
  {
    id: "2",
    name: "Napoleon Dynamite",
    tags: [Tags.comedy],
    categoryKey: "0",
  },
  {
    id: "3",
    name: "Ristorante Roma",
    tags: [Tags.italian, Tags.carmel, Tags.takeParentsTo],
    categoryKey: "1",
  },
  {
    id: "4",
    name: "Italian House",
    tags: [Tags.westfield, Tags.italian],
    categoryKey: "1",
  },
  {
    id: "5",
    name: "Juniper",
    tags: [Tags.southern],
    categoryKey: "1",
  },
  {
    id: "6",
    name: "Bottleworks",
    tags: [Tags.cocktailBar],
    categoryKey: "1",
  },
  {
    id: "7",
    name: "Chilly Water",
    tags: [Tags.brewery, Tags.downtown],
    categoryKey: "1",
  },
  {
    id: "8",
    name: "Finger Lakes, NY",
    tags: [],
    categoryKey: "cities",
  },
];
