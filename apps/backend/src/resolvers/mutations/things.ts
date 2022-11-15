import { Things } from "../../database";

export const createThing = async (_: any, args: any) => await Things.create(args);

export const updateThing = async (_: any, args: any) => {
  const { id, ...updatedThing } = args;
  return await Things.update(id, updatedThing);
};

export const deleteThing = async (_: any, args: any) => (await Things.delete(args))?.id;
