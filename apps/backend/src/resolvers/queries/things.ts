import { Things } from "../../database";

export const things = async () => await Things.getAll();
