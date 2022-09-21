import { Tag } from "./tag";

export interface Thing {
  id: string;
  name: string;
  description: string;
  tags: Tag[];
  category: string;
}
