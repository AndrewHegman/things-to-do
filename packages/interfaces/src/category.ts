import { Tag } from "./tag";
import { Thing } from "./thing";

export interface Category {
  id: string;
  name: string;
  tags: Tag[];
}
