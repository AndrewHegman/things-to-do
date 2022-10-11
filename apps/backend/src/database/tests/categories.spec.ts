import { Categories as CategoriesData } from "./data";
import { CategoryModel } from "../models";
import { connect, disconnect } from "mongoose";
import { resolvers } from "../../resolvers";
import { GetCategoriesDocument, GetCategoryDocument, typeDefs, CreateCategoryDocument } from "@ttd/graphql";
import { ApolloServer } from "apollo-server-express";

describe("Categories", () => {
  let server: ApolloServer;

  beforeAll(async () => {
    server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    await connect("mongodb://localhost:27017/Things-To-Do");
    try {
      await CategoryModel.create(CategoriesData.map((category) => ({ _id: category.id, ...category })));
    } catch (e) {
      console.error(e);
    }
  });

  afterAll(async () => {
    await CategoryModel.collection.deleteMany({});
    await disconnect();
  });

  it("should fetch all categories", async () => {
    const res = await server.executeOperation({
      query: GetCategoriesDocument,
    });

    expect(res.errors).toBeUndefined();
    expect(new Set(res.data?.categories)).toEqual(new Set(CategoriesData));
  });

  it("should fetch a single category by id", async () => {
    const res = await server.executeOperation({
      query: GetCategoryDocument,
      variables: { categoryId: CategoriesData[0].id },
    });

    expect(res.errors).toBeUndefined();
    expect(res.data?.category).toEqual(CategoriesData[0]);
  });

  it("should create a new category", async () => {
    const res = await server.executeOperation({
      query: CreateCategoryDocument,
      variables: { name: "new name" },
    });
    console.log(res);
    expect(res.errors).toBeUndefined();
    expect(res.data?.createCategory).toEqual(expect.objectContaining({ id: expect.any(String), name: "new name" }));
  });
});
