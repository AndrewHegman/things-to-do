import { Tag } from "./tag";

export interface Thing {
  id: string;
  name: string;
  tags: Tag[];
}
