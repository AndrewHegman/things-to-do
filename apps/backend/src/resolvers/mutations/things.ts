import { Things } from "../../database";

export const createThing = async (_: any, args: any) => await Things.create(args);

export const updateThing = async (_: any, args: any) => {
  const { id, ...updatedThing } = args;
  const res = await Things.update(id, updatedThing);
  return res;
};

export const deleteThing = async (_: any, args: any) => (await Things.delete(args))?.id;
