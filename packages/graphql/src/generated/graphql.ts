import { GraphQLResolveInfo } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['String'];
  name: Scalars['String'];
  tags: Array<Tag>;
  things: Array<Thing>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: Category;
  createTag: Tag;
  createThing: Thing;
  deleteThing: Scalars['String'];
  updateCategory: Category;
  updateThing: Thing;
};


export type MutationCreateCategoryArgs = {
  name: Scalars['String'];
};


export type MutationCreateTagArgs = {
  name: Scalars['String'];
};


export type MutationCreateThingArgs = {
  category: Scalars['String'];
  description: Scalars['String'];
  name: Scalars['String'];
  tags: Array<Scalars['String']>;
};


export type MutationDeleteThingArgs = {
  id: Scalars['String'];
};


export type MutationUpdateCategoryArgs = {
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
  things?: InputMaybe<Array<Scalars['String']>>;
};


export type MutationUpdateThingArgs = {
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']>>;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  category: Category;
  tags: Array<Tag>;
  tagsByCategory: Array<Tag>;
  things: Array<Thing>;
  thingsByCategories: Array<Thing>;
  thingsByCategory: Array<Thing>;
};


export type QueryCategoryArgs = {
  categoryId: Scalars['String'];
};


export type QueryTagsByCategoryArgs = {
  categoryId: Scalars['String'];
};


export type QueryThingsByCategoriesArgs = {
  categoryIds: Array<Scalars['String']>;
};


export type QueryThingsByCategoryArgs = {
  categoryId: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Thing = {
  __typename?: 'Thing';
  description: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  tags: Array<Tag>;
};

export type CategoryFragmentFragment = { __typename?: 'Category', id: string, name: string, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, things: Array<{ __typename?: 'Thing', id: string, name: string, description: string, tags: Array<{ __typename?: 'Tag', id: string, name: string }> }> };

export type TagFragmentFragment = { __typename?: 'Tag', id: string, name: string };

export type ThingFragmentFragment = { __typename?: 'Thing', id: string, name: string, description: string, tags: Array<{ __typename?: 'Tag', id: string, name: string }> };

export type CreateCategoryMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', id: string, name: string, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, things: Array<{ __typename?: 'Thing', id: string, name: string, description: string, tags: Array<{ __typename?: 'Tag', id: string, name: string }> }> } };

export type UpdateCategoryMutationVariables = Exact<{
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  things?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'Category', id: string, name: string, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, things: Array<{ __typename?: 'Thing', id: string, name: string, description: string, tags: Array<{ __typename?: 'Tag', id: string, name: string }> }> } };

export type CreateTagMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag: { __typename?: 'Tag', id: string, name: string } };

export type CreateThingMutationVariables = Exact<{
  name: Scalars['String'];
  description: Scalars['String'];
  tags: Array<Scalars['String']> | Scalars['String'];
  category: Scalars['String'];
}>;


export type CreateThingMutation = { __typename?: 'Mutation', createThing: { __typename?: 'Thing', id: string, name: string, description: string, tags: Array<{ __typename?: 'Tag', id: string, name: string }> } };

export type UpdateThingMutationVariables = Exact<{
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
}>;


export type UpdateThingMutation = { __typename?: 'Mutation', updateThing: { __typename?: 'Thing', id: string, name: string, description: string, tags: Array<{ __typename?: 'Tag', id: string, name: string }> } };

export type DeleteThingMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteThingMutation = { __typename?: 'Mutation', deleteThing: string };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, name: string, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, things: Array<{ __typename?: 'Thing', id: string, name: string, description: string, tags: Array<{ __typename?: 'Tag', id: string, name: string }> }> }> };

export type GetCategoryQueryVariables = Exact<{
  categoryId: Scalars['String'];
}>;


export type GetCategoryQuery = { __typename?: 'Query', category: { __typename?: 'Category', id: string, name: string, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, things: Array<{ __typename?: 'Thing', id: string, name: string, description: string, tags: Array<{ __typename?: 'Tag', id: string, name: string }> }> } };

export type TagsByCategoryQueryVariables = Exact<{
  categoryId: Scalars['String'];
}>;


export type TagsByCategoryQuery = { __typename?: 'Query', tagsByCategory: Array<{ __typename?: 'Tag', id: string, name: string }> };

export type GetTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTagsQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', id: string, name: string }> };

export type GetThingsTagsCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetThingsTagsCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: string, name: string, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, things: Array<{ __typename?: 'Thing', id: string, name: string, description: string, tags: Array<{ __typename?: 'Tag', id: string, name: string }> }> }>, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, things: Array<{ __typename?: 'Thing', id: string, name: string, description: string, tags: Array<{ __typename?: 'Tag', id: string, name: string }> }> };

export type GetThingsByCategoryQueryVariables = Exact<{
  categoryId: Scalars['String'];
}>;


export type GetThingsByCategoryQuery = { __typename?: 'Query', thingsByCategory: Array<{ __typename?: 'Thing', id: string, name: string, description: string, tags: Array<{ __typename?: 'Tag', id: string, name: string }> }> };

export type GetThingsByCategoriesQueryVariables = Exact<{
  categoryIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type GetThingsByCategoriesQuery = { __typename?: 'Query', thingsByCategories: Array<{ __typename?: 'Thing', id: string, name: string, description: string, tags: Array<{ __typename?: 'Tag', id: string, name: string }> }> };

export type GetThingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetThingsQuery = { __typename?: 'Query', things: Array<{ __typename?: 'Thing', id: string, name: string, description: string, tags: Array<{ __typename?: 'Tag', id: string, name: string }> }> };



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Category: ResolverTypeWrapper<Category>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Tag: ResolverTypeWrapper<Tag>;
  Thing: ResolverTypeWrapper<Thing>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Category: Category;
  Mutation: {};
  Query: {};
  String: Scalars['String'];
  Tag: Tag;
  Thing: Thing;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  things?: Resolver<Array<ResolversTypes['Thing']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationCreateCategoryArgs, 'name'>>;
  createTag?: Resolver<ResolversTypes['Tag'], ParentType, ContextType, RequireFields<MutationCreateTagArgs, 'name'>>;
  createThing?: Resolver<ResolversTypes['Thing'], ParentType, ContextType, RequireFields<MutationCreateThingArgs, 'category' | 'description' | 'name' | 'tags'>>;
  deleteThing?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationDeleteThingArgs, 'id'>>;
  updateCategory?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<MutationUpdateCategoryArgs, 'id'>>;
  updateThing?: Resolver<ResolversTypes['Thing'], ParentType, ContextType, RequireFields<MutationUpdateThingArgs, 'id'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  categories?: Resolver<Array<ResolversTypes['Category']>, ParentType, ContextType>;
  category?: Resolver<ResolversTypes['Category'], ParentType, ContextType, RequireFields<QueryCategoryArgs, 'categoryId'>>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  tagsByCategory?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType, RequireFields<QueryTagsByCategoryArgs, 'categoryId'>>;
  things?: Resolver<Array<ResolversTypes['Thing']>, ParentType, ContextType>;
  thingsByCategories?: Resolver<Array<ResolversTypes['Thing']>, ParentType, ContextType, RequireFields<QueryThingsByCategoriesArgs, 'categoryIds'>>;
  thingsByCategory?: Resolver<Array<ResolversTypes['Thing']>, ParentType, ContextType, RequireFields<QueryThingsByCategoryArgs, 'categoryId'>>;
};

export type TagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Thing'] = ResolversParentTypes['Thing']> = {
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Category?: CategoryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Tag?: TagResolvers<ContextType>;
  Thing?: ThingResolvers<ContextType>;
};


export const TagFragmentFragmentDoc = gql`
    fragment TagFragment on Tag {
  id
  name
}
    `;
export const ThingFragmentFragmentDoc = gql`
    fragment ThingFragment on Thing {
  id
  name
  description
  tags {
    ...TagFragment
  }
}
    ${TagFragmentFragmentDoc}`;
export const CategoryFragmentFragmentDoc = gql`
    fragment CategoryFragment on Category {
  id
  name
  tags {
    ...TagFragment
  }
  things {
    ...ThingFragment
  }
}
    ${TagFragmentFragmentDoc}
${ThingFragmentFragmentDoc}`;
export const CreateCategoryDocument = gql`
    mutation CreateCategory($name: String!) {
  createCategory(name: $name) {
    ...CategoryFragment
  }
}
    ${CategoryFragmentFragmentDoc}`;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($id: String!, $name: String, $things: [String!], $tags: [String!]) {
  updateCategory(id: $id, name: $name, things: $things, tags: $tags) {
    ...CategoryFragment
  }
}
    ${CategoryFragmentFragmentDoc}`;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      things: // value for 'things'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const CreateTagDocument = gql`
    mutation CreateTag($name: String!) {
  createTag(name: $name) {
    ...TagFragment
  }
}
    ${TagFragmentFragmentDoc}`;
export type CreateTagMutationFn = Apollo.MutationFunction<CreateTagMutation, CreateTagMutationVariables>;

/**
 * __useCreateTagMutation__
 *
 * To run a mutation, you first call `useCreateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTagMutation, { data, loading, error }] = useCreateTagMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateTagMutation(baseOptions?: Apollo.MutationHookOptions<CreateTagMutation, CreateTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTagMutation, CreateTagMutationVariables>(CreateTagDocument, options);
      }
export type CreateTagMutationHookResult = ReturnType<typeof useCreateTagMutation>;
export type CreateTagMutationResult = Apollo.MutationResult<CreateTagMutation>;
export type CreateTagMutationOptions = Apollo.BaseMutationOptions<CreateTagMutation, CreateTagMutationVariables>;
export const CreateThingDocument = gql`
    mutation CreateThing($name: String!, $description: String!, $tags: [String!]!, $category: String!) {
  createThing(
    name: $name
    description: $description
    tags: $tags
    category: $category
  ) {
    ...ThingFragment
  }
}
    ${ThingFragmentFragmentDoc}`;
export type CreateThingMutationFn = Apollo.MutationFunction<CreateThingMutation, CreateThingMutationVariables>;

/**
 * __useCreateThingMutation__
 *
 * To run a mutation, you first call `useCreateThingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateThingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createThingMutation, { data, loading, error }] = useCreateThingMutation({
 *   variables: {
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      tags: // value for 'tags'
 *      category: // value for 'category'
 *   },
 * });
 */
export function useCreateThingMutation(baseOptions?: Apollo.MutationHookOptions<CreateThingMutation, CreateThingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateThingMutation, CreateThingMutationVariables>(CreateThingDocument, options);
      }
export type CreateThingMutationHookResult = ReturnType<typeof useCreateThingMutation>;
export type CreateThingMutationResult = Apollo.MutationResult<CreateThingMutation>;
export type CreateThingMutationOptions = Apollo.BaseMutationOptions<CreateThingMutation, CreateThingMutationVariables>;
export const UpdateThingDocument = gql`
    mutation UpdateThing($id: String!, $name: String, $description: String, $tags: [String!]) {
  updateThing(id: $id, name: $name, description: $description, tags: $tags) {
    ...ThingFragment
  }
}
    ${ThingFragmentFragmentDoc}`;
export type UpdateThingMutationFn = Apollo.MutationFunction<UpdateThingMutation, UpdateThingMutationVariables>;

/**
 * __useUpdateThingMutation__
 *
 * To run a mutation, you first call `useUpdateThingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateThingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateThingMutation, { data, loading, error }] = useUpdateThingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      tags: // value for 'tags'
 *   },
 * });
 */
export function useUpdateThingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateThingMutation, UpdateThingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateThingMutation, UpdateThingMutationVariables>(UpdateThingDocument, options);
      }
export type UpdateThingMutationHookResult = ReturnType<typeof useUpdateThingMutation>;
export type UpdateThingMutationResult = Apollo.MutationResult<UpdateThingMutation>;
export type UpdateThingMutationOptions = Apollo.BaseMutationOptions<UpdateThingMutation, UpdateThingMutationVariables>;
export const DeleteThingDocument = gql`
    mutation DeleteThing($id: String!) {
  deleteThing(id: $id)
}
    `;
export type DeleteThingMutationFn = Apollo.MutationFunction<DeleteThingMutation, DeleteThingMutationVariables>;

/**
 * __useDeleteThingMutation__
 *
 * To run a mutation, you first call `useDeleteThingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteThingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteThingMutation, { data, loading, error }] = useDeleteThingMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteThingMutation(baseOptions?: Apollo.MutationHookOptions<DeleteThingMutation, DeleteThingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteThingMutation, DeleteThingMutationVariables>(DeleteThingDocument, options);
      }
export type DeleteThingMutationHookResult = ReturnType<typeof useDeleteThingMutation>;
export type DeleteThingMutationResult = Apollo.MutationResult<DeleteThingMutation>;
export type DeleteThingMutationOptions = Apollo.BaseMutationOptions<DeleteThingMutation, DeleteThingMutationVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories {
  categories {
    ...CategoryFragment
  }
}
    ${CategoryFragmentFragmentDoc}`;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCategoryDocument = gql`
    query GetCategory($categoryId: String!) {
  category(categoryId: $categoryId) {
    ...CategoryFragment
  }
}
    ${CategoryFragmentFragmentDoc}`;

/**
 * __useGetCategoryQuery__
 *
 * To run a query within a React component, call `useGetCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useGetCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, options);
      }
export function useGetCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, options);
        }
export type GetCategoryQueryHookResult = ReturnType<typeof useGetCategoryQuery>;
export type GetCategoryLazyQueryHookResult = ReturnType<typeof useGetCategoryLazyQuery>;
export type GetCategoryQueryResult = Apollo.QueryResult<GetCategoryQuery, GetCategoryQueryVariables>;
export const TagsByCategoryDocument = gql`
    query TagsByCategory($categoryId: String!) {
  tagsByCategory(categoryId: $categoryId) {
    ...TagFragment
  }
}
    ${TagFragmentFragmentDoc}`;

/**
 * __useTagsByCategoryQuery__
 *
 * To run a query within a React component, call `useTagsByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagsByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagsByCategoryQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useTagsByCategoryQuery(baseOptions: Apollo.QueryHookOptions<TagsByCategoryQuery, TagsByCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TagsByCategoryQuery, TagsByCategoryQueryVariables>(TagsByCategoryDocument, options);
      }
export function useTagsByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagsByCategoryQuery, TagsByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TagsByCategoryQuery, TagsByCategoryQueryVariables>(TagsByCategoryDocument, options);
        }
export type TagsByCategoryQueryHookResult = ReturnType<typeof useTagsByCategoryQuery>;
export type TagsByCategoryLazyQueryHookResult = ReturnType<typeof useTagsByCategoryLazyQuery>;
export type TagsByCategoryQueryResult = Apollo.QueryResult<TagsByCategoryQuery, TagsByCategoryQueryVariables>;
export const GetTagsDocument = gql`
    query GetTags {
  tags {
    ...TagFragment
  }
}
    ${TagFragmentFragmentDoc}`;

/**
 * __useGetTagsQuery__
 *
 * To run a query within a React component, call `useGetTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTagsQuery(baseOptions?: Apollo.QueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, options);
      }
export function useGetTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagsQuery, GetTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTagsQuery, GetTagsQueryVariables>(GetTagsDocument, options);
        }
export type GetTagsQueryHookResult = ReturnType<typeof useGetTagsQuery>;
export type GetTagsLazyQueryHookResult = ReturnType<typeof useGetTagsLazyQuery>;
export type GetTagsQueryResult = Apollo.QueryResult<GetTagsQuery, GetTagsQueryVariables>;
export const GetThingsTagsCategoriesDocument = gql`
    query GetThingsTagsCategories {
  categories {
    ...CategoryFragment
  }
  tags {
    ...TagFragment
  }
  things {
    ...ThingFragment
  }
}
    ${CategoryFragmentFragmentDoc}
${TagFragmentFragmentDoc}
${ThingFragmentFragmentDoc}`;

/**
 * __useGetThingsTagsCategoriesQuery__
 *
 * To run a query within a React component, call `useGetThingsTagsCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetThingsTagsCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetThingsTagsCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetThingsTagsCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetThingsTagsCategoriesQuery, GetThingsTagsCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetThingsTagsCategoriesQuery, GetThingsTagsCategoriesQueryVariables>(GetThingsTagsCategoriesDocument, options);
      }
export function useGetThingsTagsCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetThingsTagsCategoriesQuery, GetThingsTagsCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetThingsTagsCategoriesQuery, GetThingsTagsCategoriesQueryVariables>(GetThingsTagsCategoriesDocument, options);
        }
export type GetThingsTagsCategoriesQueryHookResult = ReturnType<typeof useGetThingsTagsCategoriesQuery>;
export type GetThingsTagsCategoriesLazyQueryHookResult = ReturnType<typeof useGetThingsTagsCategoriesLazyQuery>;
export type GetThingsTagsCategoriesQueryResult = Apollo.QueryResult<GetThingsTagsCategoriesQuery, GetThingsTagsCategoriesQueryVariables>;
export const GetThingsByCategoryDocument = gql`
    query GetThingsByCategory($categoryId: String!) {
  thingsByCategory(categoryId: $categoryId) {
    ...ThingFragment
  }
}
    ${ThingFragmentFragmentDoc}`;

/**
 * __useGetThingsByCategoryQuery__
 *
 * To run a query within a React component, call `useGetThingsByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetThingsByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetThingsByCategoryQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useGetThingsByCategoryQuery(baseOptions: Apollo.QueryHookOptions<GetThingsByCategoryQuery, GetThingsByCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetThingsByCategoryQuery, GetThingsByCategoryQueryVariables>(GetThingsByCategoryDocument, options);
      }
export function useGetThingsByCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetThingsByCategoryQuery, GetThingsByCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetThingsByCategoryQuery, GetThingsByCategoryQueryVariables>(GetThingsByCategoryDocument, options);
        }
export type GetThingsByCategoryQueryHookResult = ReturnType<typeof useGetThingsByCategoryQuery>;
export type GetThingsByCategoryLazyQueryHookResult = ReturnType<typeof useGetThingsByCategoryLazyQuery>;
export type GetThingsByCategoryQueryResult = Apollo.QueryResult<GetThingsByCategoryQuery, GetThingsByCategoryQueryVariables>;
export const GetThingsByCategoriesDocument = gql`
    query GetThingsByCategories($categoryIds: [String!]!) {
  thingsByCategories(categoryIds: $categoryIds) {
    ...ThingFragment
  }
}
    ${ThingFragmentFragmentDoc}`;

/**
 * __useGetThingsByCategoriesQuery__
 *
 * To run a query within a React component, call `useGetThingsByCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetThingsByCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetThingsByCategoriesQuery({
 *   variables: {
 *      categoryIds: // value for 'categoryIds'
 *   },
 * });
 */
export function useGetThingsByCategoriesQuery(baseOptions: Apollo.QueryHookOptions<GetThingsByCategoriesQuery, GetThingsByCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetThingsByCategoriesQuery, GetThingsByCategoriesQueryVariables>(GetThingsByCategoriesDocument, options);
      }
export function useGetThingsByCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetThingsByCategoriesQuery, GetThingsByCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetThingsByCategoriesQuery, GetThingsByCategoriesQueryVariables>(GetThingsByCategoriesDocument, options);
        }
export type GetThingsByCategoriesQueryHookResult = ReturnType<typeof useGetThingsByCategoriesQuery>;
export type GetThingsByCategoriesLazyQueryHookResult = ReturnType<typeof useGetThingsByCategoriesLazyQuery>;
export type GetThingsByCategoriesQueryResult = Apollo.QueryResult<GetThingsByCategoriesQuery, GetThingsByCategoriesQueryVariables>;
export const GetThingsDocument = gql`
    query GetThings {
  things {
    ...ThingFragment
  }
}
    ${ThingFragmentFragmentDoc}`;

/**
 * __useGetThingsQuery__
 *
 * To run a query within a React component, call `useGetThingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetThingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetThingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetThingsQuery(baseOptions?: Apollo.QueryHookOptions<GetThingsQuery, GetThingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetThingsQuery, GetThingsQueryVariables>(GetThingsDocument, options);
      }
export function useGetThingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetThingsQuery, GetThingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetThingsQuery, GetThingsQueryVariables>(GetThingsDocument, options);
        }
export type GetThingsQueryHookResult = ReturnType<typeof useGetThingsQuery>;
export type GetThingsLazyQueryHookResult = ReturnType<typeof useGetThingsLazyQuery>;
export type GetThingsQueryResult = Apollo.QueryResult<GetThingsQuery, GetThingsQueryVariables>;

  export const typeDefs = gql`schema{query:Query mutation:Mutation}type Category{id:String!name:String!tags:[Tag!]!things:[Thing!]!}type Mutation{createCategory(name:String!):Category!createTag(name:String!):Tag!createThing(category:String!description:String!name:String!tags:[String!]!):Thing!deleteThing(id:String!):String!updateCategory(id:String!name:String tags:[String!]things:[String!]):Category!updateThing(description:String id:String!name:String tags:[String!]):Thing!}type Query{categories:[Category!]!category(categoryId:String!):Category!tags:[Tag!]!tagsByCategory(categoryId:String!):[Tag!]!things:[Thing!]!thingsByCategories(categoryIds:[String!]!):[Thing!]!thingsByCategory(categoryId:String!):[Thing!]!}type Tag{id:String!name:String!}type Thing{description:String!id:String!name:String!tags:[Tag!]!}`;
