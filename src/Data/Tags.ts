import { Tag } from "../Interface/Tags";

export const NamedTags: { [key: string]: Tag } = {
  action: {
    name: "Action",
    id: "1",
    category: "0",
  },
  drama: {
    name: "Drama",
    id: "2",
    category: "0",
  },
  romance: {
    name: "Romance",
    id: "3",
    category: "0",
  },
  war: {
    name: "War",
    id: "4",
    category: "0",
  },
  comedy: {
    name: "Comedy",
    id: "5",
    category: "0",
  },
  italian: {
    name: "Italian",
    id: "6",
    category: "1",
  },
  carmel: {
    name: "Carmel",
    id: "7",
    category: "1",
  },
  takeParentsTo: {
    name: "Take Parents To",
    id: "8",
    category: "1",
  },
  westfield: {
    name: "Westfield",
    id: "9",
    category: "1",
  },
  southern: {
    name: "Southern",
    id: "10",
    category: "1",
  },
  cocktailBar: {
    name: "Cocktail Bar",
    id: "11",
    category: "1",
  },
  brewery: {
    name: "Brewery",
    id: "12",
    category: "1",
  },
  downtown: {
    name: "Downtown",
    id: "13",
    category: "1",
  },
};

export const Tags = Object.keys(NamedTags).map((key) => ({
  name: NamedTags[key].name,
  id: NamedTags[key].id,
  category: NamedTags[key].category,
}));
