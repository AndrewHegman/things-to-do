// https://github.com/shepherdjerred/archive/blob/main/mira-hq/model/src/typescript-typedefs.ts

import { printSchemaWithDirectives } from "@graphql-tools/utils";
import { GraphQLSchema, stripIgnoredCharacters } from "graphql";

// https://github.com/dotansimha/graphql-code-generator/issues/3899
const print = (schema: string) => `
  export const typeDefs = gql\`${schema}\`;
`;

export const plugin = (schema: GraphQLSchema) => print(stripIgnoredCharacters(printSchemaWithDirectives(schema)));
