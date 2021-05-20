import { ToDoItem } from "../Interface/ToDoItem";
import { Tags } from "./Tags";

export const data: { [key: string]: ToDoItem[] } = {
  "1": [
    {
      id: "1",
      name: "The Italian Job",
      tags: [Tags.action],
    },
    {
      id: "2",
      name: "Casablanca",
      tags: [Tags.drama, Tags.romance, Tags.war],
    },
    {
      id: "3",
      name: "Napoleon Dynamite",
      tags: [Tags.comedy],
    },
  ],
  "2": [
    {
      id: "4",
      name: "Ristorante Roma",
      tags: [Tags.italian, Tags.carmel, Tags.takeParentsTo],
    },
    {
      id: "5",
      name: "Italian House",
      tags: [Tags.westfield, Tags.italian],
    },
    {
      id: "6",
      name: "Juniper",
      tags: [Tags.southern],
    },
    {
      id: "7",
      name: "Bottleworks",
      tags: [Tags.cocktailBar],
    },
    {
      id: "8",
      name: "Chilly Water",
      tags: [Tags.brewery, Tags.downtown],
    },
  ],
};
