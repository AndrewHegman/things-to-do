import { Tags } from "../../database";

export const createTag = async (_: any, args: any) => await Tags.create(args);
