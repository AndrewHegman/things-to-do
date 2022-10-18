import { Data } from "./data";
import { CategoryModel, TagModel } from "../models";
import { connect, disconnect } from "mongoose";
import { resolvers } from "../../resolvers";
import { typeDefs, GetTagsDocument, Tag, TagsByCategoryDocument, CreateTagDocument } from "@ttd/graphql";
import { ApolloServer } from "apollo-server-express";
import { hydrateDatabase, tearDownDatabase } from "./setup";

describe("Tags", () => {
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

  it("should fetch all tags", async () => {
    const res = await server.executeOperation({
      query: GetTagsDocument,
    });

    expect(res.errors).toBeUndefined();
    expect(res.data?.tags.sort((tag1: Tag, tag2: Tag) => (tag1.name > tag2.name ? -1 : 1))).toEqual(
      Data.Expect.Tags.sort((tag1, tag2) => (tag1.name > tag2.name ? -1 : 1))
    );
  });

  it("should fetch all tags by category", async () => {
    const res = await server.executeOperation({
      query: TagsByCategoryDocument,
      variables: { categoryId: Data.Raw.Categories[0].id },
    });

    expect(res.errors).toBeUndefined();
    expect(res.data?.tagsByCategory.sort((tag1: Tag, tag2: Tag) => (tag1.name > tag2.name ? -1 : 1))).toEqual(
      Data.Expect.Tags.filter((tag) => tag.category?.id === Data.Raw.Categories[0].id).sort((tag1, tag2) =>
        tag1.name > tag2.name ? -1 : 1
      )
    );
  });

  it("should create a new tag", async () => {
    const res = await server.executeOperation({
      query: CreateTagDocument,
      variables: { name: "new name", category: Data.Raw.Categories[0].id },
    });
    expect(res.errors).toBeUndefined();
    expect(res.data?.createTag).toEqual(
      expect.objectContaining({ id: expect.any(String), name: "new name", category: Data.Expect.Categories[0] })
    );
  });
});
