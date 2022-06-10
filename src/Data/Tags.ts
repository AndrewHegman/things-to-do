import { Tag } from "../Interface/Tags";

export const NamedTags: { [key: string]: Tag } = {
  action: {
    name: "Action",
    _id: "1",
    category: "0",
  },
  drama: {
    name: "Drama",
    _id: "2",
    category: "0",
  },
  romance: {
    name: "Romance",
    _id: "3",
    category: "0",
  },
  war: {
    name: "War",
    _id: "4",
    category: "0",
  },
  comedy: {
    name: "Comedy",
    _id: "5",
    category: "0",
  },
  italian: {
    name: "Italian",
    _id: "6",
    category: "1",
  },
  carmel: {
    name: "Carmel",
    _id: "7",
    category: "1",
  },
  takeParentsTo: {
    name: "Take Parents To",
    _id: "8",
    category: "1",
  },
  westfield: {
    name: "Westfield",
    _id: "9",
    category: "1",
  },
  southern: {
    name: "Southern",
    _id: "10",
    category: "1",
  },
  cocktailBar: {
    name: "Cocktail Bar",
    _id: "11",
    category: "1",
  },
  brewery: {
    name: "Brewery",
    _id: "12",
    category: "1",
  },
  downtown: {
    name: "Downtown",
    _id: "13",
    category: "1",
  },
};

export const Tags = Object.keys(NamedTags).map((key) => ({
  name: NamedTags[key].name,
  _id: NamedTags[key]._id,
  category: NamedTags[key].category,
}));
