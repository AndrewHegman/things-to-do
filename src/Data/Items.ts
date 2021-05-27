import { ToDoItem } from "../Interface/ToDoItem";
import { Tags } from "./Tags";

export const items: ToDoItem[] = [
  {
    id: "1",
    name: "The Italian Job",
    tags: [Tags.action],
    categoryKey: "1",
  },
  {
    id: "2",
    name: "Casablanca",
    tags: [Tags.drama, Tags.romance, Tags.war],
    categoryKey: "1",
  },
  {
    id: "3",
    name: "Napoleon Dynamite",
    tags: [Tags.comedy],
    categoryKey: "1",
  },
  {
    id: "4",
    name: "Ristorante Roma",
    tags: [Tags.italian, Tags.carmel, Tags.takeParentsTo],
    categoryKey: "2",
  },
  {
    id: "5",
    name: "Italian House",
    tags: [Tags.westfield, Tags.italian],
    categoryKey: "2",
  },
  {
    id: "6",
    name: "Juniper",
    tags: [Tags.southern],
    categoryKey: "2",
  },
  {
    id: "7",
    name: "Bottleworks",
    tags: [Tags.cocktailBar],
    categoryKey: "2",
  },
  {
    id: "8",
    name: "Chilly Water",
    tags: [Tags.brewery, Tags.downtown],
    categoryKey: "2",
  },
];
