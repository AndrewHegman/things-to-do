import { Categories, Tags, Things } from "..";

export interface Context {
  Categories: typeof Categories;
  Things: typeof Things;
  Tags: typeof Tags;
}
