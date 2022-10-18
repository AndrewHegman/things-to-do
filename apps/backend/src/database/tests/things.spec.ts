import { Data } from "./data";
import { disconnect } from "mongoose";
import { resolvers } from "../../resolvers";
import {
  typeDefs,
  CreateThingDocument,
  UpdateThingDocument,
  GetThingsTagsCategoriesDocument,
  Category,
  Thing,
  Tag,
  DeleteThingDocument,
} from "@ttd/graphql";
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

  describe("GetThingsTagsCategories", () => {
    let res: any;

    beforeEach(async () => {
      res = await server.executeOperation({
        query: GetThingsTagsCategoriesDocument,
      });
    });
    it("should fetch all categories", async () => {
      expect(res.errors).toBeUndefined();
      expect(
        res.data?.categories.sort((category1: Category, category2: Category) => (category1.name > category2.name ? -1 : 1))
      ).toEqual(Data.Expect.Categories.sort((category1, category2) => (category1.name > category2.name ? -1 : 1)));
    });

    it("should fetch all things", async () => {
      expect(res.errors).toBeUndefined();
      expect(res.data?.things.sort((thing1: Thing, thing2: Thing) => (thing1.name > thing2.name ? -1 : 1))).toEqual(
        Data.Expect.Things.sort((thing1, thing2) => (thing1.name > thing2.name ? -1 : 1))
      );
    });

    it("should fetch all tags", async () => {
      console.log(res.data.tags);
      expect(res.errors).toBeUndefined();
      expect(res.data?.tags.sort((tag1: Tag, tag2: Tag) => (tag1.name > tag2.name ? -1 : 1))).toEqual(
        Data.Expect.Tags.sort((tag1, tag2) => (tag1.name > tag2.name ? -1 : 1))
      );
    });
  });

  it("should create a new thing", async () => {
    const res = await server.executeOperation({
      query: CreateThingDocument,
      variables: {
        name: "new name",
        description: "new description",
        tags: [Data.Raw.Tags[0].id, Data.Raw.Tags[1].id],
        category: Data.Raw.Categories[0].id,
      },
    });
    expect(res.errors).toBeUndefined();
    expect(res.data?.createThing).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: "new name",
        category: Data.Expect.Categories[0],
        tags: [Data.Expect.Tags[0], Data.Expect.Tags[1]],
        description: "new description",
      })
    );
  });

  it("should update a thing", async () => {
    const res = await server.executeOperation({
      query: UpdateThingDocument,
      variables: {
        id: Data.Raw.Things[0].id,
        name: "updated name",
        description: "updated description",
        tags: [Data.Raw.Tags[4].id, Data.Raw.Tags[5].id],
        category: Data.Raw.Categories[0].id,
      },
    });
    expect(res.errors).toBeUndefined();
    expect(res.data?.updateThing).toEqual({
      id: Data.Expect.Things[0].id,
      name: "updated name",
      category: Data.Expect.Categories[0],
      tags: [Data.Expect.Tags[4], Data.Expect.Tags[5]],
      description: "updated description",
    });
  });

  it("should delete a thing", async () => {
    const res = await server.executeOperation({
      query: DeleteThingDocument,
      variables: {
        id: "123412341234",
      },
    });

    expect(res.errors).toBeUndefined();
    expect(res.data?.deleteThing).toBe(Data.Expect.Things[0].id);
  });
});
