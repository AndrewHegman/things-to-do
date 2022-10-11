import { Tag } from "./tag";

export interface Thing {
  id: string;
  name: string;
  description: string;
  tags: string[];
  category: string;
}
