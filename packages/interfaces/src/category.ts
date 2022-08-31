import { Thing } from "./thing";

export interface Category {
  id: string;
  name: string;
  things: Thing[];
}
