import { ToDoItem } from "../Interface/ToDoItem";
import { Tags } from "./Tags";

export const items: ToDoItem[] = [
  {
    id: "0",
    name: "The Italian Job",
    tags: [Tags.action],
    categoryKey: "movies",
  },
  {
    id: "1",
    name: "Casablanca",
    tags: [Tags.drama, Tags.romance, Tags.war],
    categoryKey: "movies",
  },
  {
    id: "2",
    name: "Napoleon Dynamite",
    tags: [Tags.comedy],
    categoryKey: "movies",
  },
  {
    id: "3",
    name: "Ristorante Roma",
    tags: [Tags.italian, Tags.carmel, Tags.takeParentsTo],
    categoryKey: "restaurants",
  },
  {
    id: "4",
    name: "Italian House",
    tags: [Tags.westfield, Tags.italian],
    categoryKey: "restaurants",
  },
  {
    id: "5",
    name: "Juniper",
    tags: [Tags.southern],
    categoryKey: "restaurants",
  },
  {
    id: "6",
    name: "Bottleworks",
    tags: [Tags.cocktailBar],
    categoryKey: "restaurants",
  },
  {
    id: "7",
    name: "Chilly Water",
    tags: [Tags.brewery, Tags.downtown],
    categoryKey: "restaurants",
  },
  {
    id: "8",
    name: "Finger Lakes, NY",
    tags: [],
    categoryKey: "cities",
  },
];
