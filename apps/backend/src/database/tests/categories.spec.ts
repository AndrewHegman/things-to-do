import { Data } from "./data";
import { CategoryModel } from "../models";
import { connect, disconnect } from "mongoose";
import { resolvers } from "../../resolvers";
import { GetCategoriesDocument, GetCategoryDocument, typeDefs, CreateCategoryDocument } from "@ttd/graphql";
import { ApolloServer } from "apollo-server-express";
import { hydrateDatabase, tearDownDatabase } from "./setup";

describe("Categories", () => {
  let server: ApolloServer;

  beforeAll(async () => {
    server = new ApolloServer({
      typeDefs,
      resolvers,
    });
    await hydrateDatabase();
  });

  afterAll(async () => {
    await tearDownDatabase();
    await disconnect();
  });

  it("should fetch all categories", async () => {
    const res = await server.executeOperation({
      query: GetCategoriesDocument,
    });

    expect(res.errors).toBeUndefined();
    expect(new Set(res.data?.categories)).toEqual(new Set(Data.Expect.Categories));
  });

  it("should fetch a single category by id", async () => {
    const res = await server.executeOperation({
      query: GetCategoryDocument,
      variables: { categoryId: Data.Raw.Categories[0].id },
    });

    expect(res.errors).toBeUndefined();
    expect(res.data?.category).toEqual(Data.Raw.Categories[0]);
  });

  it("should create a new category", async () => {
    const res = await server.executeOperation({
      query: CreateCategoryDocument,
      variables: { name: "new name" },
    });
    expect(res.errors).toBeUndefined();
    expect(res.data?.createCategory).toEqual(expect.objectContaining({ id: expect.any(String), name: "new name" }));
  });
});
